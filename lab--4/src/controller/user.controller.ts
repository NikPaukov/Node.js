import express from "express";
import * as userService from '../services/user.service'

const usersRoutes = express.Router();

usersRoutes.route("/").get((req, res)=>{
    return res.send(userService.getAll());
})
usersRoutes.route("/:id").get((req, res)=>{
    const user =userService.getOne(req.body.id);
    if(user){
     return res.send(user);
    }
    res.sendStatus(400);
})
usersRoutes.route("/").post((req, res)=>{
    if(req.body.name && req.body.username){
        userService.create(req.body);
        res.sendStatus(201);
        return;
    }
    res.sendStatus(400);
})

usersRoutes.route("/").put((req, res) => {
    try{
        userService.update(req.body.id, req.body);
        res.sendStatus(200);
    } catch (e){
        res.send({error:e});
        res.sendStatus(400);
    }

})
export default usersRoutes;