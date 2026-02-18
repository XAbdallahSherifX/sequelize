import { Op } from "sequelize";
import { UniqueConstraintError, ValidationError } from "sequelize";
import UserModel from "../../database/models/user.model.js";
export async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const isExist = await UserModel.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  if (isExist) {
    return res.status(409).json({ message: "Email already exists" });
  } else {
    const user = UserModel.build({ name, email, password });
    await user.save();
    return res.status(201).json({ message: "user added successfully", user });
  }
}
export async function createOrUpdate(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await UserModel.findOrCreate({
    where: { id: req.params.id },
    defaults: { name, email, password },
    validate: false,
  });
  if (user[1] === false) {
    const updatedUser = await UserModel.update(
      { name, email, password },
      { where: { id: req.params.id }, validate: false },
    );
    return res
      .status(200)
      .json({ message: "user updated successfully", user: updatedUser[0] });
  }
  return res
    .status(200)
    .json({ message: "user created successfully", user: user[0] });
}
export async function getUserByEmail(req, res) {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({
    where: { email: { [Op.eq]: email } },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user, message: "user fetched successfully" });
}
export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByPk(id, {
    attributes: ["id", "name", "email", "password"],
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user, message: "user fetched successfully" });
}
