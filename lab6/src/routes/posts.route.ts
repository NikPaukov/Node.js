import express from "express";
import * as postService from '../services/posts.service'
import * as userService from '../services/users.service'
import {validation} from "../middlewares/yup.middleware";
import {getAll, getOneById, updateOne, post, deleteOne} from '../validation/post.validation'

const postRoutes = express.Router();

postRoutes.route("/").get(validation(getAll),async (req, res) => {
        const result = await postService.getAll(req.query);
        res.send(result);
})
postRoutes.route("/:id").get(validation(getOneById),async (req, res) => {
        if (req.params.id) {
            const result = await postService.getById(req.params.id);
            res.send(result);
        }
});
postRoutes.route("/").post(validation(post),async (req, res) => {
    const {user_id, text, title} = req.body;
        const user = await postService.createOne(
            {id: null, dateCreation: new Date(), user: user_id, text: text, title: title})
        res.status(201).send({created: 'created', id: user.id});
})
postRoutes.route("/:id").delete(validation(deleteOne),async (req, res) => {
        if (req.params.id) {
            const result = await postService.deleteOne(req.params.id);
            return res.send(result);
        }
});
postRoutes.route("/:id").patch(validation(updateOne),async (req, res) => {
        if (req.params.id) {
            const {user_id, text, title} = req.body;
            //might be better in service, but did it here to handsomely pass partial
            const user = await userService.getById(user_id);
            if (!user) return res.status(400).send({error: "No such user"});
            const result = await postService.updateOne(req.params.id,
                {user, text, title});
            res.send(result);
        }
});
export default postRoutes;