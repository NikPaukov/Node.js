import express from "express";

const router = express.Router();
import usersRoutes from "./users.route";
import postRoutes from "./posts.route";
router.use("/users", usersRoutes)
router.use("/posts", postRoutes)
export default router;