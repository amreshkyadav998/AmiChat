import express from "express";
import { checkAuth, login, logout, signup,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout);
// to update the profile pic
router.put("/update-profile",protectRoute,updateProfile); // the one who is updating , check he is authenticated or not(for that protectRoute is using)

router.get("/check",protectRoute,checkAuth);
export default router;

// mongodb password - mGEGIJS2bAyYN0UX