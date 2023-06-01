import express from "express"
import apiRoutes from "./routes/index.route"
import {AppDataSource} from "./config/data-source.js"
import {Request, Response} from "express"
import dotenv from "dotenv";
import httpLogger from "./middlewares/httpLogger.middleware";
import Logger from "./config/Logger";
import {User} from "./entities/user.entity";
import bodyParser from "body-parser";

dotenv.config();

//configuring server
const app = express();
app.use(bodyParser.json());
app.use(httpLogger);
app.use("/api", apiRoutes);

app.use((req: Request, res: Response) => {
    Logger.error({
        error: "Not found",
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        method: req.method,
        status: 404,
    })
    res.status(404);
    res.json({error: "Endpoint not found"});
});
//starting server
const PORT = +process.env.PORT || 5000;
export const server = app.listen(PORT, () => {
    console.warn(`Server is running on port ${PORT}`);
});


AppDataSource.initialize().then(async () => {
    console.log("Database connected!");
}).catch(error => console.log(error))
