const bcrypt = require('bcryptjs');
const supabase = require('../services/supabase.service');

// SIGNUP
exports.signup = async (req, res) => {
    const { username, email, mobile, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('usertable')
            .insert([
                {
                    username,
                    email,
                    mobile,
                    password: hashedPassword
                }
            ])
            .select(); // return inserted row

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(201).json({
            message: 'Signup successful',
            user: data[0]
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};






// LOGIN
const jwt = require('jsonwebtoken'); // <-- add this

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email/Mobile and password required' });
    }
    
    try {
        // Fetch all users matching email OR mobile
        const { data, error } = await supabase
            .from('usertable')
            .select('*')
            .or(`email.eq.${email},mobile.eq.${email}`);

        if (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Find the matching user
        const user = data.find(u => u.email === email || u.mobile === email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Remove sensitive data
        delete user.password;

        // ----------------------------
        // 1️⃣ Generate JWT token here
        // ----------------------------
        const token = jwt.sign(
            { id: user.id, email: user.email }, // payload
            'YOUR_SECRET_KEY',                 // <-- replace with env var in production
            { expiresIn: '1h' }                // token expiry
        );

        // Send response including token
        res.status(200).json({
            message: 'Login successful',
            token,   // <-- this is what frontend will store
            user
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};


