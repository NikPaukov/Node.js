import express from "express";

const router = express.Router();
import usersRoutes from "./users.route";
import postRoutes from "./posts.route";
router.use("/user", usersRoutes)
router.use("/post", postRoutes)
export default router;