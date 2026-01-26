const axios = require('axios');
const qs = require('querystring');

const API_KEY = process.env.API_KEY || "a19b5d0b341a1cd960018796326030df3788f032c74915d0394a5744f9d9";

exports.findPan = async (req, res) => {
    let { aadhaar_no } = req.query;          // ✅ match frontend
    const aadhaar = String(aadhaar_no || '').trim();

    // Aadhaar validation
    if (!/^\d{12}$/.test(aadhaar)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid Aadhaar number"
        });
    }

    try {
        const response = await axios({
            method: 'GET',
            url: 'https://www.apizone.info/api/find_pan/aadhaar_to_pan.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                api_key: API_KEY,
                aadhaar_no: aadhaar   // ✅ correct param for API
            })
        });

        return res.status(200).json(response.data);

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        return res.status(500).json({
            status: 500,
            message: "PAN API failed",
            error: error.message
        });
    }
};
