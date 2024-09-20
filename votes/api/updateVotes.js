export default async function handler(req, res) {
    // Додаємо заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://ninjable.io'); // Дозволяємо доступ з вашого домену
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Обробляємо передзапити (preflight) для метода OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Дозволяємо запити
    }

    // Обробляємо POST запит для оновлення голосів
    if (req.method === 'POST') {
        const { id, votes } = req.body;

        try {
            // Запит до MockAPI для оновлення голосів
            const response = await fetch(`https://66ed47bb380821644cdc47f2.mockapi.io/features/${id}`, {
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
