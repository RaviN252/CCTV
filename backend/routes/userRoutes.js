const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserCont");
const { authMiddleware, adminMiddleware } = require("../Middleware/authMiddleware");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profile", authMiddleware, UserController.getProfile);

// 🟢 Allow any authenticated user to fetch and delete users temporarily
router.get("/", authMiddleware, UserController.getAllUsers);
router.delete('/:id', authMiddleware, UserController.deleteUser);

// Keep update protected by auth only
router.put("/:id", authMiddleware, UserController.updateUser);

module.exports = router;
