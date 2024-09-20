export default async function handler(req, res) {
    // Додаємо заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://ninjable.io'); // Дозволяємо запити з вашого домену
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Дозволяємо POST та OPTIONS
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Дозволяємо заголовки Content-Type

    // Якщо це передзапит (preflight), то відповідаємо успішно
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Успішна відповідь на preflight
    }

    // Якщо це POST запит
    if (req.method === 'POST') {
        const { id, votes } = req.body;

        try {
            // Надсилаємо PUT запит до MockAPI для оновлення голосів
            const response = await fetch(`https://66edbb6b380821644cddd697.mockapi.io/features/features/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes })
            });

            if (!response.ok) {
                throw new Error('Failed to update votes on MockAPI');
            }

            const updatedItem = await response.json();
            res.status(200).json({ message: 'Votes updated successfully', updatedItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update votes' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
