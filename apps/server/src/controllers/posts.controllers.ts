import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

export const getPost = asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json({ message: "get post" });
});

export const createPost = asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json({ message: "create post" });
});

export const updatePost = asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json({ message: "update post" });
});

export const deletePost = asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json({ message: "delete post" });
});
