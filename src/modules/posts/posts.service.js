import { col, fn } from "sequelize";
import CommentModel from "../../database/models/comment.model.js";
import PostModel from "../../database/models/post.model.js";
import UserModel from "../../database/models/user.model.js";

export async function createPost(req, res) {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ message: "Title, content, and userId are required" });
  }
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const post = new PostModel({ title, content, userId });
  await post.save();
  return res.status(201).json({ message: "Post created successfully", post });
}
export async function deletePost(req, res) {
  const { userId } = req.body;
  const { id } = req.params;
  const post = await PostModel.findByPk(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found", post });
  }
  if (Number(post.userId) !== Number(userId)) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this post", post });
  }
  await post.destroy();
  return res.status(200).json({ message: "Post deleted successfully", post });
}
export async function getPostsDetails(req, res) {
  const posts = await PostModel.findAll({
    attributes: ["id", "title"],
    include: [
      { model: UserModel, attributes: ["id", "name"], as: "user" },
      { model: CommentModel, attributes: ["id", "content"], as: "comments" },
    ],
  });
  return res
    .status(200)
    .json({ message: "Posts details retrieved successfully", posts });
}
export async function getPostsAndCountComments(req, res) {
  const posts = await PostModel.findAll({
    attributes: [
      "id",
      "title",
      [fn("COUNT", col("comments.id")), "commentCount"],
    ],
    include: [
      {
        model: CommentModel,
        as: "comments",
        attributes: [],
      },
    ],
    group: ["postId"],
  });
  return res.status(200).json({
    message: "Posts with comment counts retrieved successfully",
    posts,
  });
}
