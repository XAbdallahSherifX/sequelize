import { Router } from "express";
const commentRouter = Router();
import { createBulkComments, findOrCreateComment, getNewestCommentByPostId, searchCommentByWord, updateComment,getCommentDetailsById } from "./comments.service.js";
commentRouter.post("/", createBulkComments);
commentRouter.patch("/:id",updateComment)
commentRouter.post("/find-or-create",findOrCreateComment);
commentRouter.get("/search",searchCommentByWord)
commentRouter.get("/newest/:postId",getNewestCommentByPostId)
commentRouter.get("/details/:id",getCommentDetailsById)
export default commentRouter;