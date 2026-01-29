import { getPost } from "@/controllers/posts.controllers";
import { Router } from "express";

const router = Router();

router.get("/", getPost);

export default router;
