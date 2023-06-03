import express from "express";
import * as userService from '../services/user.service'

const usersRoutes = express.Router();

usersRoutes.route("/").get((req, res)=>{
    return res.send(userService.getAll());
})
usersRoutes.route("/:id").get((req, res)=>{
    const user =userService.getOne(req.body.id);
     return res.send(user);
})
usersRoutes.route("/").post((req, res)=>{
    if(req.body.name && req.body.username){
        const user = userService.create(req.body);
        return res.status(201).send({created:true, id:user.id});
    }
    res.sendStatus(400);
})

usersRoutes.route("/:id").path((req, res) => {
    try{
        const result = userService.update(req.params.id, req.body);
        res.send(result);
    } catch (e){
        res.send({error:e});
        res.sendStatus(400);
    }

});
usersRoutes.route("/:id").delete((req,res)=>{
    const result = usersRoutes.delete(req.params.id);
    res.send(result);
});
export default usersRoutes;