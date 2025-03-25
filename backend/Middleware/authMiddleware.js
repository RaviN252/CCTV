const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        // ✅ Allow hardcoded admin access without token
        if (req.body.email === 'admin' && req.body.password === 'Admin@123') {
            req.user = {
                id: "admin_id",
                role: "admin",
                accessType: "hardcoded"
            };
            console.log("✅ Hardcoded Admin Access Granted!");
            return next();
        }

        // ✅ Require JWT for normal users
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied, no valid token provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format." });
        }

        console.log("Extracted Token:", token); // Debugging

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("Decoded Token:", decoded); // Debugging

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

// ✅ Admin Only Middleware (Allows Hardcoded Admin)
exports.adminMiddleware = (req, res, next) => {
    console.log("User role from token:", req.user.role); // Debugging

    if (!req.user || (req.user.role !== 'admin' && req.user.accessType !== "hardcoded")) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};
