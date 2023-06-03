import {db} from '../db'
import {User} from '../models/User.model';
import uuid from 'crypto'

export function create(user: User) {
    user.id = uuid.randomUUID();
    db.push(user);
    return user;
}

export function getOneById(id: string) {
    return db.find(u => u.id = id);
}

export function getAll() {
    return [...db];
}

export function deleteOne(id: string) {
    const index = db.findIndex(u => u.id = id);
    db.splice(index, 1);
    return {affected: (index||index===0)?1:0};
}

export function updateOne(id: string, data: Partial<User>) {
    const user = getOneById(id);
    if(data.id) data.id=undefined;
    if (user) {
        let key: keyof typeof user;
        for (key in data) {
            user[key] = data[key]||user[key];
         }
        return {affected: 1}
    }
    return {affected: 0}
}