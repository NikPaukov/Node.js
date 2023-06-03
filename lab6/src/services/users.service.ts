import {UserDto} from "../entities/user.entity";
import * as userRepository from '../repositories/user.repository'

export async function getAll(params: { city?: string, age?: string, page?: string, limit?: string, title?: string }) {
    const paginationParams = {
        page: +params.page || 0,
        limit: +params.limit || 3
    }
    const searchParams = {
        age: +params.age,
        address: params.city ? {city: params.city} : undefined,
        title: params.title || undefined
    };
    return userRepository.getAllByAgeOrPostTitleOrCityWithPagination(searchParams, paginationParams);
}

export function getById(id: string) {
    return userRepository.getOneById(id);
}

export function createOne(user: UserDto) {
    return userRepository.createOne(user);
}

export function deleteOne(id: string) {
    return userRepository.deleteOne(id);
}

export function updateOne(id: string, data: Partial<UserDto>) {
    return userRepository.updateOne(id, data);
}