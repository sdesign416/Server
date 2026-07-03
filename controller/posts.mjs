import * as postRepository from "../data/posts.mjs"


// post 작성하는 함수
export async function createPost(req, res) {
    const{text} = req.body
    const post = await postRepository.create(text, req.id)
    res.status(201).json(post)
}