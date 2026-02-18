import CommentModel from "./comment.model.js";
import PostModel from "./post.model.js";
import UserModel from "./user.model.js";
UserModel.hasMany(PostModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "posts",
});
PostModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user",
});
PostModel.hasMany(CommentModel, {
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "comments",
});
CommentModel.belongsTo(PostModel, {
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "post",
});
UserModel.hasMany(CommentModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "comments",
});
CommentModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user",
});
export { UserModel, PostModel, CommentModel };
