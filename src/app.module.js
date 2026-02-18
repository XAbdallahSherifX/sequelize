import express from "express";
import { sequelize } from "./database/database.connections.js";
import { PORT } from "../src/config/config.service.js";
import * as models from "../src/database/models/index.js";
import * as routers from "./modules/index.js";
export default async function bootstrap() {
  const app = express();
  await sequelize.sync({ alter: true });
  app.use(express.json());
  app.use("/users", routers.userRouter);
  app.use("/posts", routers.postRouter);
  app.use("/comments", routers.commentRouter);
  app.use((err, req, res, next) => {
    const errorMessage = err.stack.split("\n")[0];
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage,
      error: err.stack,
    });
  });
  app.use("{/*demo}", (req, res, next) => {
    return res.status(404).json({ message: "Invalid routing" });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
