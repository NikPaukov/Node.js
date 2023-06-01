import {AppDataSource} from "../config/data-source";
import {Post} from "../entities/post.entity";
import exp from "constants";
import {User} from "../entities/user.entity";
import * as userService from './users.service'

const postRepository = AppDataSource.getRepository(Post);

export async function getAll(params: { user_id?: string, page?: string, limit?: string }) {
    const page = +params.page || 0;
    const limit = +params.limit || 3;

    let user
    if (params.user_id) user = (await userService.getById(params.user_id)) || undefined;
    console.log(user);
    const [result, total] = await postRepository.findAndCount({

            relations: ["user"],
            take: limit,
            where: {user: user},
            skip: page * limit
        }
    );
    return {data: result, total, page, limit, prevPage: page !== 0, nextPage: total > limit * (page + 1)};
}

export function getById(id: string) {
    if (!+id) throw new Error("Invalid id");
    return postRepository.findOne(
        {
            where: {id: +id},
            relations: ["user"]
        });
}

export function createOne(post: Post) {
    return postRepository.save(post);
}

export function deleteOne(id: string) {
    if (!+id) throw new Error("Invalid id");
    return postRepository.delete({id: +id});
}

export function updateOne(id: string, data: Partial<Post>) {
    if (!+id) throw new Error("Invalid id");
    return postRepository.update(id, data);
}