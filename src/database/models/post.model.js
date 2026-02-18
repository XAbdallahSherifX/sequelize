import { sequelize } from "../database.connections.js";
import { DataTypes, Model } from "sequelize";
class PostModel extends Model {}
PostModel.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, tableName: "posts", paranoid: true, sequelize },
);
export default PostModel;
