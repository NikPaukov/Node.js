import {AppDataSource} from "../config/data-source";
import {User} from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User);


export async function getAll(params: { city?: string, age?: string, page?: string, limit?: string, title?:string }) {
    const page = +params.page || 0;
    const limit = +params.limit || 3;

    const searchParams = {
        age: +params.age,
        address: params.city ? {city: params.city} : undefined,
        title: params.title||undefined
    };
    const [result, total] = await userRepository
        .createQueryBuilder("users")
        .leftJoin("posts", "p", "p.user_id=users.id")
        .where(!isNaN(searchParams.age) ? 'users.age = :age' : 'TRUE', {age: searchParams.age})
        //just passed city here without params because of ":" in query;)
        .andWhere(searchParams.address ?
            `users.address ::jsonb @> \'{"city":"${searchParams.address.city}"}\'` : 'TRUE')
        .andWhere(searchParams.title?"p.title=:title":'true',{title:searchParams.title})
        .take(limit)
        .skip(page * limit)
        .orderBy({"users.id": "ASC"})
        .getManyAndCount();
    return {data: result, total, page, limit, prevPage: page !== 0, nextPage: total > limit * (page + 1)};
}

export  function getById(id: string) {
    if (!+id) throw new Error("Invalid id");
    return userRepository.findOneBy({id: +id});
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