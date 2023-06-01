import express from "express";
import * as postService from '../services/posts.service'
import {createOne} from "../services/users.service";
import * as userService from '../services/users.service'
import Logger from "../config/Logger";


const postRoutes = express.Router();

postRoutes.route("/").get(async (req, res) => {
    try {
        const result = await postService.getAll(req.query);
        res.send(result);
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.detail});
    }
})
postRoutes.route("/:id").get(async (req, res) => {
    try {
        if (req.params.id) {
            const result = await postService.getById(req.params.id);
            res.send(result);
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.detail});
    }
});
postRoutes.route("/").post(async (req, res) => {
    const {user_id, text, title} = req.body;
    try {
        const user = await postService.createOne(
            {id: null, dateCreation: new Date(), user: user_id, text: text, title: title})
        res.status(201).send({created: 'created', id: user.id});
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.detail});
    }
})
postRoutes.route("/:id").delete(async (req, res) => {
    try {
        if (req.params.id) {
            const result = await postService.deleteOne(req.params.id);
            return res.send(result);
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.detail});
    }
});
postRoutes.route("/:id").patch(async (req, res) => {
    try {
        if (req.params.id) {
            const {user_id, text, title} = req.body;
            //might be better in service, but did it here to handsomely pass partial
            const user = await userService.getById(user_id);
            if (!user) return res.status(400).send({error: "No such user"});
            const result = await postService.updateOne(req.params.id,
                {user, text, title});
            res.send(result);
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.detail});
    }
});
export default postRoutes;