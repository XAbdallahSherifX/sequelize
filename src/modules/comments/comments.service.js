import { col, fn, Op } from "sequelize";
import CommentModel from "../../database/models/comment.model.js";
import PostModel from "../../database/models/post.model.js";
import UserModel from "../../database/models/user.model.js";

export async function createBulkComments(req, res) {
  const { comments } = req.body;
  const areValid = comments.every((comment) => {
    return comment.content && comment.postId && comment.userId;
  });
  if (!areValid) {
    return res.status(400).json({ message: "Invalid comments data" });
  }
  const createdComments = await CommentModel.bulkCreate(comments);
  return res
    .status(201)
    .json({ message: "Comments created successfully", createdComments });
}
export async function updateComment(req, res) {
  const { id } = req.params;
  const { content, userId } = req.body;
  if (!content || !userId) {
    return res.status(400).json({ message: "Content and userId are required" });
  }
  const comment = await CommentModel.findByPk(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (Number(userId) !== Number(comment.userId)) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this comment" });
  }
  await comment.update({ content });
  return res
    .status(200)
    .json({ message: "Comment updated successfully", comment });
}
export async function findOrCreateComment(req, res) {
  const { content, postId, userId } = req.body;
  if (!content || !postId || !userId) {
    return res
      .status(400)
      .json({ message: "Content, postId and userId are required" });
  }
  const [comment, created] = await CommentModel.findOrCreate({
    where: { content, postId, userId },
    defaults: { content, postId, userId },
  });
  if (created) {
    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
  }
  return res.status(200).json({ message: "Comment already exists", comment });
}
export async function searchCommentByWord(req, res) {
  const { word } = req.query;
  if (!word) {
    return res.status(400).json({ message: "Search word is required" });
  }
  const comments = await CommentModel.findAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  return res.status(200).json({
    message: "Comments retrieved successfully",
    comments,
    count: comments.length,
  });
}
export async function getNewestCommentByPostId(req, res) {
  const { postId } = req.params;
  const comments = await CommentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
  });
  if (!comments || comments.length === 0) {
    return res.status(404).json({ message: "No comments found for this post" });
  }
  const allComments = comments.map((comment, index) => {
    if (index > 2) return null;
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  });
  return res.status(200).json({
    message: "Newest comment retrieved successfully",
    comments: allComments.filter((comment) => comment !== null),
  });
}
export async function getCommentDetailsById(req, res) {
  const { id } = req.params;
  const comment = await CommentModel.findByPk(id, {
    attributes: ["id", "content", "createdAt"],
    include: [
      {
        model: UserModel,
        attributes: ["id", "name"],
        as: "user",
      },
      {
        model: PostModel,
        attributes: ["id", "title"],
        as: "post",
      },
    ],
  });
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res
    .status(200)
    .json({ message: "Comment details retrieved successfully", comment });
}
