import * as yup from "yup";

const postSchema = yup.object({
  title: yup.string().required(),
  text: yup.string().required(),
  user_id: yup.number().required(),
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
    body: postSchema
});
export const updateOne = yup.object({
    params: yup.object({id: yup.number()}),
    body: postSchema
})
export const deleteOne = yup.object({
    params: yup.object({id: yup.number()}),
})