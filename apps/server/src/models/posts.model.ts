import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const obj = ret as any;
                obj.id = obj._id.toString();
                delete obj._id;
                delete obj.__v;
                return ret;
            },
        },
    },
);

export const Post = mongoose.model("Post", postSchema);
