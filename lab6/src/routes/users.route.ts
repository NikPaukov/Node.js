import express from "express";
import * as userService from '../services/users.service'

const usersRoutes = express.Router();
import {getAll, getOneById, updateOne, post, deleteOne} from '../validation/user.validation'
import {validation} from "../middlewares/yup.middleware";

usersRoutes.route("/").get(validation(getAll), async (req, res) => {
    const result = await userService.getAll(req.query);
    res.send(result);
})
usersRoutes.route("/:id").get(validation(getOneById), async (req, res) => {
    if (req.params.id) {
        const result = await userService.getById(req.params.id);
        res.send(result);
    }

});
usersRoutes.route("/").post(validation(post), async (req, res) => {
    const {username, email, age, address, info} = req.body;
    const user = await userService.createOne({id: null, username, email, age, address, info})
    res.status(201).send({created: 'created', id: user.id});
})
usersRoutes.route("/:id").delete(validation(deleteOne), async (req, res) => {
    if (req.params.id) {
        const result = await userService.deleteOne(req.params.id);
        return res.send(result);
    }
});
usersRoutes.route("/:id").patch(validation(updateOne), async (req, res) => {
    if (req.params.id) {
        const {username, email, age, address, info} = req.body;
        const result = await userService.updateOne(req.params.id,
            {username, email, age, address, info});
        res.send(result);
    }
});
export default usersRoutes;