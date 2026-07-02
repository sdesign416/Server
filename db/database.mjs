import MongDB from "mongodb"
import {config} from "../config.mjs"

// 전역변수
let db

// db 연결하는 함수
export async function connectDB() {
    return MongDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb")
    })
}