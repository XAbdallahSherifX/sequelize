import { Router } from "express";
import { createPost, deletePost, getPostsAndCountComments, getPostsDetails } from "./posts.service.js";
const postRouter = Router();
postRouter.post("/", createPost);
postRouter.delete("/:id",deletePost);
postRouter.get("/details",getPostsDetails);
postRouter.get("/comment-counts",getPostsAndCountComments);
export default postRouter;
