const User = require("../Schema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use .env for security

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Login Attempt for:", email);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found in DB");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ User found:", user);

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ Password matched!");

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login successful!");
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};


// @desc    Get logged-in user profile
// @route   GET /api/users/profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users", error: error.message });
//     }
// };


exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users excluding passwords for security
        const users = await User.find().select("-password");

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// @desc    Update user
// @route   PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
