import {AppDataSource} from "../config/data-source";
import {User, UserDto} from "../entities/user.entity";
import {StatusCodeError} from "../errors/StatusCodeError";

const userRepository = AppDataSource.getRepository(User);

export async function getAllByAgeOrPostTitleOrCityWithPagination(
    searchParams: { age?: number, address?: { city: string }, title?: string },
    paginationParams: { page?: number, limit: number }
) {
    const [result, total] = await userRepository
        .createQueryBuilder("users")
        .leftJoin("posts", "p", "p.user_id=users.id")
        .where(!isNaN(searchParams.age) ? 'users.age = :age' : 'TRUE', {age: searchParams.age})
        .andWhere(searchParams.address ?
            `users.address ::jsonb @> \'{"city":"${searchParams.address.city}"}\'` : 'TRUE')
        .andWhere(searchParams.title ? "p.title=:title" : 'true', {title: searchParams.title})
        .take(paginationParams.limit)
        .skip(paginationParams.page * paginationParams.limit)
        .orderBy({"users.id": "ASC"})
        .getManyAndCount();
    return {
        data: <UserDto[]>result, total,
        page: paginationParams.page,
        limit: paginationParams.limit,
        prevPage: paginationParams.page !== 0,
        nextPage: total > paginationParams.limit * (paginationParams.page + 1)
    };
}

export function getOneById(id: string) {
    return <Promise<UserDto>>userRepository.findOne({
        where:{id: +id},
    });
}

export function createOne(user: UserDto) {
    return <Promise<UserDto>>userRepository.save(<User>user);
}

export function deleteOne(id: string) {
    return userRepository.delete({id: +id});
}

export function updateOne(id: string, data: Partial<UserDto>) {
    return userRepository.update(id, data);
}