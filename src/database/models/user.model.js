import { sequelize } from "../database.connections.js";
import { DataTypes } from "sequelize";
function checkNameLength(user) {
  
  if (!user.name || user.name.length <= 2) {
    throw new Error("Name must be longer than 2 characters");
  }
}
const UserModel = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length < 6) {
            throw new Error("Password must be at least 6 characters long");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
    hooks: {
      beforeCreate: (user) => {
        checkNameLength(user);
      },
    },
  },
);
export default UserModel;
