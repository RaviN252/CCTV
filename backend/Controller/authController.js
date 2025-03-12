const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Schema/UserSchema'); // Adjust path as needed

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword, role: role || 'user' });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check for admin login (hardcoded)
        if (email === 'admin' && password === 'Admin@123') {
            user = { id: 'admin_id', name: 'Admin', email: 'admin', role: 'admin' };
        } else {
            // Verify user password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        // Ensure JWT_SECRET is not undefined
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "Server error: Missing JWT_SECRET" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (error) {
        console.error("Login error:", error);  // Debugging log
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Export functions properly
module.exports = {
    register,
    login,
    getProfile,
};
