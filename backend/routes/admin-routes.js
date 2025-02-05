import express from "express";
import { approvePost, deleteAdminUser, getadminPosts, getAdminStats, getadminUsers, getContactUs, rejectPost } from "../controllers/admin-controller.js";

const router = express.Router();

router.get("/users", getadminUsers);
router.get("/posts", getadminPosts);
router.delete("/users/:id", deleteAdminUser);
router.post("/posts/approve", approvePost);
router.post("/posts/reject", rejectPost);
router.get("/stats", getAdminStats);
router.get("/contactUs", getContactUs);


export default router;