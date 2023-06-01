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
    if(params.user_id) user = (await userService.getById(params.user_id))||undefined;
    const [result, total] = await postRepository.findAndCount({
            where:{user:user},
            take: limit,
            skip:page*limit
        }
    );
    console.log(result[0].user);
    return {data: result, total, page, limit, prevPage: page !== 0, nextPage: total > limit * (page + 1)};
}

export async function getById(id: string) {
    if (!+id) throw new Error("Invalid id");
    return (await postRepository.findBy({id: +id}))[0];
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