import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { Post } from "@/models/posts.model";
import {
    createPostSchema,
    postParamsSchema,
    postQuerySchema,
    updatePostSchema,
} from "@/validators/posts.validator";

export const getAllPost = asyncHandler(async (req: Request, res: Response) => {
    const queryResult = postQuerySchema.safeParse(req.query);

    if (!queryResult.success) {
        const errors = queryResult.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        res.status(400).json({
            message: "400 Bad Request",
            errors,
        });
        return;
    }

    const { term } = queryResult.data;

    const filter: Record<string, any> = {};

    if (term) {
        const regex = new RegExp(term, "i");
        filter.$or = [
            { title: regex },
            { content: regex },
            { category: regex },
            { tags: regex },
        ];
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ posts });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = postParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
        const issues = paramsResult.error.issues;

        const errors = issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        res.status(400).json({
            message: "400 Bad Request",
            errors,
        });
        return;
    }

    const id = paramsResult.data.id;
    const post = await Post.findById(id);
    if (!post) {
        res.status(404).json({ message: "404 Not found" });
        return;
    }
    res.status(200).json({ message: "200 OK", post });
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const result = createPostSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        res.status(400).json({
            message: "400 Bad Request",
            errors,
        });
        return;
    }
    const { title, content, category, tags } = result.data;

    const newPost = await Post.create({
        title,
        content,
        category,
        tags,
    });
    res.status(201).json({ message: "created", newPost });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = postParamsSchema.safeParse(req.params);
    const bodyResult = updatePostSchema.safeParse(req.body);
    if (!paramsResult.success || !bodyResult.success) {
        const issues = [
            ...(paramsResult.success ? [] : paramsResult.error.issues),
            ...(bodyResult.success ? [] : bodyResult.error.issues),
        ];
        const errors = issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        res.status(400).json({
            message: "400 Bad Request",
            errors,
        });
        return;
    }

    const id = paramsResult.data.id;
    console.log("id", id);
    const updateData = bodyResult.data;

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    if (!updatedPost) {
        res.status(404).json({ message: "404 Not found" });
        return;
    }

    res.status(200).json({ message: "200 OK", updatedPost });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = postParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
        const issues = paramsResult.error.issues;

        const errors = issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        res.status(400).json({
            message: "400 Bad Request",
            errors,
        });
        return;
    }

    const id = paramsResult.data.id;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        res.status(404).json({ message: "404 Not found" });
        return;
    }
    res.status(200).json({ message: "204 No content" });
});
