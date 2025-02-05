import express from "express";
import { contactUs, createUser, deleteUser, getUserById, getUsers, updateUser, validateLogin } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", validateLogin);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/contactus", contactUs);


export default router;