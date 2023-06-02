import cors from "cors";
import express, { Request, Response } from "express";
import 'dotenv/config';
import usersRoutes from "./src/controller/user.controller";
export const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(usersRoutes)
// app.use("/api", apiRoutes);
app.use((req: Request, res: Response) => {
    res.status(404);
    if (req.accepts("json")) {
        res.json({ error: "Not found" });
        return;
    }
    res.type("txt").send("Not found");
});


export const server = app.listen(PORT, () => {
    console.warn(`Server is running on port ${PORT}`);
});


