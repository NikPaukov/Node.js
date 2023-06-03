import * as userRepository from '../repositories/user.repository'
import {User} from "../models/User.model";

export function create(user: User) {
    return userRepository.create(user);

}

export function getAll() {
    return userRepository.getAll();
}

export function getOne(id: string) {
    return userRepository.getOneById(id);
}

export function update(id: string, user: User) {
    return userRepository.updateOne(id, user);
}

export function deleteOne(id: string) {
    return userRepository.deleteOne(id)
}


