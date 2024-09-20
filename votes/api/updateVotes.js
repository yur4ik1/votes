export default async function handler(req, res) {
    // Додаємо заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://ninjable.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обробляємо передзапити (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { id, votes } = req.body;

        // Додаємо логування для перевірки даних
        console.log('Received data:', { id, votes });

        try {
            const response = await fetch(`https://mockapi.io/endpoint/features/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes })
            });

            // Логуємо відповідь з MockAPI
            console.log('MockAPI response status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to update votes on MockAPI');
            }

            const updatedItem = await response.json();
            console.log('Updated item:', updatedItem);

            res.status(200).json({ message: 'Votes updated successfully', updatedItem });
        } catch (error) {
            console.error('Error updating votes:', error);
            res.status(500).json({ error: 'Failed to update votes' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
