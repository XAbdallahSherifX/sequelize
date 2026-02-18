import { sequelize } from "../database.connections.js";
import { DataTypes, Model } from "sequelize";
class CommentModel extends Model {}
CommentModel.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
  },
  { freezeTableName: true, tableName: "comments", sequelize },
);
export default CommentModel;
