import {AppDataSource} from "../config/data-source";
import {User} from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User);


export async function getAll(params: { city?: string, age?: string, page?: string, limit?: string }) {
    const page = +params.page || 0;
    const limit = +params.limit || 3;

    const searchParams = {
        age: +params.age,
        address: params.city ? {city: params.city} : undefined,
    };
    const [result, total] = await userRepository
        .createQueryBuilder("users")
        .select()
        .where(!isNaN(searchParams.age) ? 'users.age = :age' : 'TRUE', {age: searchParams.age})
        //just passed city here without params because of ":" in query;)
        .andWhere(searchParams.address ?
            `users.address ::jsonb @> \'{"city":"${searchParams.address.city}"}\'` : 'TRUE')
        .take(limit)
        .skip(page * limit)
        .orderBy({id: "ASC"})
        .getManyAndCount();
    return {data: result, total, page, limit, prevPage: page !== 0, nextPage: total > limit * (page + 1)};
}

export async function getById(id: string) {
    if (!+id) throw new Error("Invalid id");
    return (await userRepository.findBy({id: +id}))[0];
}

export function createOne(user: User) {
    return userRepository.save(user);
}

export function deleteOne(id: string) {
    if (!+id) throw new Error("Invalid id");
    return userRepository.delete({id: +id});
}

export function updateOne(id: string, data: Partial<User>) {
    if (!+id) throw new Error("Invalid id");
    return userRepository.update(id, data);
}