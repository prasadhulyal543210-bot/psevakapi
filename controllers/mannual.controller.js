const supabase = require('../services/supabase.service');
exports.submitRation = async (req, res) => {

    try {
        const { pdf_name, user_email } = req.body;

        if (!pdf_name || !user_email) {
            return res.status(400).json({
                message: 'pdf_name and user_email are required'
            });
        }

        const { data, error } = await supabase
            .from('rationMannual')
            .insert([
                {
                    pdf_name,
                    user_email
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(201).json({
            message: 'Ration submission saved',
            submission: data[0]
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};


exports.getRationSubmissions = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rationMannual')
            .select('*'); // get all submissions

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json({ submissions: data });
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};
