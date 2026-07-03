import MongoDB, { ObjectId } from "mongodb"
import * as UserRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"

// post 작성
export async function create(text, id) {
    return UserRepository.findById(id).then((user) => getPosts().insertOne({
        text,
        createdAt: new Date(), 
        idx: user.id,
        name: user.name,
        userid: user.userid
    })).then((result) => {
        return getPosts().findOne({_id: result.insertedId})
    })
    
}

// post 전체 가져오기(id 없는 경우)
export async function getAll() {
    return getPosts().find().sort({createdAt: -1}).toArray()
}

// post 전체 가져오기(id 있는 경우)
export async function getAllByUserid() {
    return getPosts().find({userid}).sort({createdAt: -1}).toArray()
}

// post _id로 조회하기
export async function getById(id) {
    return getPosts().find({ _id: new ObjectId(id) }).next().then(mapOptionalPost)
}

// post _id로 수정하기
export async function update(id, text) {
    return getPosts().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { text } },
        { returnDocument: "after" }
    ).then((result) => result)
}

// post id로 삭제하기
export async function remove(id) {
    return getPosts().deleteOne({ _id: new ObjectId(id) })
}

// 조회에 사용된 함수
function mapOptionalPost(post){
    return post ? { ...post, id: post._id.toString() } : post
}