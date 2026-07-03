import MongoDB from "mongodb"
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