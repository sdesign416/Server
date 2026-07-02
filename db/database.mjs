import MongDB from "mongodb"
import {config} from "../config.mjs"

// 전역 변수: MongoDB 데이터베이스 객체를 저장
let db

// MongoDB 서버에 연결하고 사용할 데이터베이스(Xdb)를 선택
export async function connectDB() {
    return MongDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb")
    })
}

// users 컬랙션 객체:  DB에 저장된 users 컬렉션에 접근할 수 있는 객체를 반환
export function getUsers() {
    return db.collection("users")
}

// posts 컬렉션 객체 반환: DB에 저장된 posts 컬렉션에 접근할 수 있는 객체를 반환
export function getPosts() {
    return db.collection("posts")
}

