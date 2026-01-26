// controllers/rc.controller.js
const axios = require('axios');
const qs = require('querystring');

const API_KEY = process.env.API_KEY || "a19b5d0b341a1cd960018796326030df3788f032c74915d0394a5744f9d9";

exports.findRC = async (req, res) => {
    const { rcno, cardtype, chiptype } = req.body; // must come from body

    if (!rcno) {
        return res.status(400).json({ status: 400, message: "RC number is required" });
    }

    try {
        const response = await axios({
            method: 'GET', // Apizone says GET
            url: 'https://www.apizone.info/api/rc_pdf/rc.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ // ✅ send as x-www-form-urlencoded
                api_key: API_KEY,
                rcno: rcno,
                cardtype: cardtype || '',
                chiptype: chiptype || ''
            })
        });

        res.status(200).json(response.data);

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ status: 500, message: "RC API failed", error: error.message });
    }
};
