import * as postRepository from "../data/posts.mjs"


// post 작성하는 함수
export async function createPost(req, res) {
    const{text} = req.body
    const post = await postRepository.create(text, req.id)
    res.status(201).json(post)
}

// 전체 post 가져오는 함수
export async function getPosts(req, res) {
    const userid = req.query.userid
    const data = await(userid ? postRepository.getAllByUserid(userid) : postRepository.getAll())
    res.status(200).json(data)
    
}