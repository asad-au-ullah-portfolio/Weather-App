import fetch from 'node-fetch';

export default async function handler(req, res) {
    const city = req.query.q || 'London';
    const apiKey = import.meta.env.WEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not set' });
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        if (!response.ok) {
            const err = await response.json();
            return res.status(response.status).json(err);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}