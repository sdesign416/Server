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

// 글 번호(_id)로 가져오는 함수
export async function getPost(req, res) {
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(post){
        res.status(200).json(post)
    }else{
        res.status(404).json({ message: `${id}의 포스트가 없습니다`})
    }
}


// id로 post 수정
export async function updatePost(req, res) {
    const id = req.params.id
    const text = req.body.text
    const post = await postRepository.getById(id)
    if(!post){
        return res.status(404).json({ message: `${id}의 포스트가 없습니다`})
    }
    if (post.idx !== req.id) {
        return res.sendStatus(403)
    }
    const updated = await postRepository.update(id, text)
    res.status(200).json(updated)
}

// id로 삭제
export async function deletePost(req, res){
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(!post){
        return res.status(404).json({ message: `${id}의 포스트가 없습니다`})
    }
    if(post.idx !== req.id){
        return res.sendStatus(403) // json으로 보낼게 아니라서 sendStatus
    }
    await postRepository.remove(id)
    res.sendStatus(204)
}
