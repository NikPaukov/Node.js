import {AppDataSource} from "../config/data-source";
import {Post, PostDto} from "../entities/post.entity";
import {User, UserDto} from "../entities/user.entity";
import {StatusCodeError} from "../errors/StatusCodeError";

const postRepository = AppDataSource.getRepository(Post);

export async function getAllByUserWithPagination(searchParams: { user?: UserDto },
                                                 paginationParams: { page: number, limit: number }) {
    const [result, total] = await postRepository.findAndCount({
            relations: ["user"],
            take: paginationParams.limit,
            where: {user: <User>searchParams.user},
            skip: paginationParams.page * paginationParams.limit,
            order: {id: "ASC"}
        }
    );
    return {
        data: <PostDto[]>result, total,
        page: paginationParams.page, limit: paginationParams.limit,
        prevPage: paginationParams.page !== 0,
        nextPage: total > paginationParams.limit * (paginationParams.page + 1)
    };
}

export function getOneById(id: string) {
    return <Promise<PostDto>>postRepository.findOne({
        where: {id: +id}, relations: ["user"]
    });
}

export function createOne(post: PostDto) {
    return <Promise<PostDto>>postRepository.save(<Post>post);
}

export function deleteOne(id: string) {
    return postRepository.delete({id: +id});
}

export function updateOne(id: string, data: Partial<PostDto>) {
    return postRepository.update(id, data);
}