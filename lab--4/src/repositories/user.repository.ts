import {db} from '../db'
import {User} from '../models/User.model';
import uuid from 'crypto'
export function create(user: User){
    user.id=uuid.randomUUID();
    //no constraints for unique users;)
    db.push(user);
    return user;
}
export function getOneById(id: string){
    console.log(db.find(u=>u.id=id));
    console.log(db.filter(u=>u.id=id))
    return db.find(u=>u.id=id);
}

export function getAll(){
    return [...db];
}
export function deleteOne(id: string){
    const index = db.findIndex(u=>u.id=id);
    //should work the same even if user does not exist
    db.splice(index, 1);
}
export function updateOne(id: string, data: User){
    const user = getOneById(id);
    if(user){
        let key:keyof typeof user;
        for(key in user){
            user[key]=data[key];
        }
    } else{
        throw new Error("User not found");
    }
}