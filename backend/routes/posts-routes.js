import express from "express";
import { createPost, deletePost, getPosts, getPostsById, getPostsBytoken, likePost, PostViews } from "../controllers/posts-controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/details/:id", getPostsById);
router.post("/like", likePost);
router.post("/views", PostViews)
router.get("/:token", getPostsBytoken);
router.delete("/:id", deletePost);


export default router;