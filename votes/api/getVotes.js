export default async function handler(req, res) {
    // Додаємо заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://ninjable.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Дозволяємо preflight запити
    }

    const { id } = req.query;

    try {
        const response = await fetch(`https://66edbb6b380821644cddd697.mockapi.io/features/features/${id}`);
        const data = await response.json();
        res.status(200).json({ votes: data.votes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch votes' });
    }
}
