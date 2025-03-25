const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Schema/UserSchema'); // Adjust path as needed

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await user.save();
        console.log("User saved successfully");

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const login = async (req, res) => {
    try {
        console.log("Received login request:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // ✅ Hardcoded Admin Login (No JWT required)
        if (email === 'admin@example.com' && password === 'Admin@123') {
            console.log("Admin logged in!");
            return res.json({
                message: "Admin login successful",
                user: {
                    id: "admin_id",
                    name: "Admin",
                    email: "admin",
                    role: "admin",
                    accessType: "hardcoded" // Indicate this is hardcoded access
                }
            });
        }

        // ✅ Normal User Login (JWT required)
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Stored hashed password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET is missing in environment variables");
            return res.status(500).json({ message: "Server error: Missing JWT_SECRET" });
        }

        // Generate JWT Token for normal users
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        console.log("Generated Token:", token); // Debugging

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const getProfile = async (req, res) => {
    try {
        console.log("Fetching profile for user ID:", req.user.id);

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Allow admin to delete any user
        if (req.user.role !== "admin" && req.user.id !== id && req.user.accessType !== "hardcoded") {
            return res.status(403).json({ message: "Access denied. You can only delete your own account." });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = {
    register,
    login,
    getProfile,
    deleteUser,  
};

