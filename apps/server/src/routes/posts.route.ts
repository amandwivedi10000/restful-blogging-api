import {
    createPost,
    deletePost,
    getAllPost,
    getPost,
    updatePost,
} from "@/controllers/posts.controllers";
import { Router } from "express";

const router = Router();

router.get("/", getAllPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);

export default router;
