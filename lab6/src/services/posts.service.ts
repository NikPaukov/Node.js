import {AppDataSource} from "../config/data-source";
import {Post, PostDto} from "../entities/post.entity";
import exp from "constants";
import {User} from "../entities/user.entity";
import * as userService from './users.service'

import * as postRepository from '../repositories/post.repository'

export async function getAll(params: { user_id?: string, page?: string, limit?: string }) {
    const paginationParams = {
        page: +params.page || 0,
        limit: +params.limit || 3
    }
    let user
    if (params.user_id) user = (await userService.getById(params.user_id)) || undefined;
    const searchParams = {user};
    return postRepository.getAllByUserWithPagination(searchParams, paginationParams);
}

export function getById(id: string) {
    return postRepository.getOneById(id);
}

export function createOne(post: PostDto) {
    return postRepository.createOne(post);
}

export function deleteOne(id: string) {
    return postRepository.deleteOne(id);
}

export function updateOne(id: string, data: Partial<PostDto>) {
    return postRepository.updateOne(id, data);
}