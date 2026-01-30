import { z } from "zod";

// make it even more robust

export const createPostSchema = z.object({
    title: z.string().min(1, "title is required"),
    content: z.string().min(1, "content is required"),
    category: z.string().min(1, "category is required"),
    tags: z.array(z.string()).min(1, "tags are required").max(1),
});

export const updatePostSchema = createPostSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "at least one field is required",
    );

export const postParamsSchema = z.object({
    id: z
        .string()
        .min(1, "id is required")
        .regex(/^[0-9a-fA-F]{24}$/, "invalid post id"),
});

export const postQuerySchema = z.object({
    term: z.string().trim().min(1).optional(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type PostParams = z.infer<typeof postParamsSchema>;
export type PostQuery = z.infer<typeof postQuerySchema>;
