import * as yup from "yup";
import exp from "constants";

const userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    age: yup.number().required(),
    info: yup.string(),
    address: yup.object({
        city: yup.string().required(),
        street: yup.string().required(),
    }).required().default({city: "", street: ""})
});
export const getAll = yup.object({
    query:yup.object({
        title:yup.string(),
        age:yup.number(),
        city:yup.string(),
        page:yup.number(),
        limit:yup.number()
    })
});
export const getOneById = yup.object({
    params: yup.object({id: yup.number()}),
})

export const post = yup.object({
    body: userSchema
});
export const updateOne = yup.object({
    params: yup.object({id: yup.number()}),
    body: userSchema
})
export const deleteOne = yup.object({
    params: yup.object({id: yup.number()}),
})