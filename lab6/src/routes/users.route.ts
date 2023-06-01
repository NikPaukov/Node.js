import express from "express";
import * as userService from '../services/users.service'
import {createOne} from "../services/users.service";
import {User} from "../entities/user.entity";

const usersRoutes = express.Router();

usersRoutes.route("/").get(async (req, res) => {
    const result = await userService.getAll(req.query);
    res.send(result);
})
usersRoutes.route("/:id").get(async (req, res) => {
    try {
        if (req.params.id) {
            const result = await userService.getById(req.params.id);
            res.send(result);
        }
    } catch (e) {
        res.status(400).send({error: e.detail});
    }
});
usersRoutes.route("/").post(async (req, res) => {
    const {username, email, age, address, info} = req.body;
    try {
        const user = await userService.createOne({id: null, username, email, age, address, info})
        res.status(201).send({created: 'created', id: user.id});
    } catch (e) {
        res.status(400).send({error: e.detail});
    }
})
usersRoutes.route("/:id").delete(async (req, res) => {
    try {
        if (req.params.id) {
            const result = await userService.deleteOne(req.params.id);
            return res.send(result);
        }
    } catch (e) {
        res.status(400).send({error: e.detail});
    }
});
usersRoutes.route("/:id").patch(async (req, res) => {
    try {
        if (req.params.id) {
            const {username, email, age, address, info} = req.body;
            const result = await userService.updateOne(req.params.id,
                {username, email, age, address, info});
            res.send(result);
        }
    } catch (e) {
        res.status(400).send({error: e.detail});
    }
});
export default usersRoutes;