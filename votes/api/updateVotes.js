export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://ninjable.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { id, votes } = req.body;

        try {
            const response = await fetch(`https://mockapi.io/endpoint/features/${id}`, {
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
            res.status(500).json({ error: 'Failed to update votes' });
        }
    } else if (req.method === 'GET') {
        res.status(405).json({ message: 'GET requests are not allowed. Use POST.' });
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
