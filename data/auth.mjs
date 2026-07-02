import MongoDB from "mongodb"
import {getUsers} from "../db/database.mjs"

// ObjectId다룰 객체
const ObjectId = MongoDB.ObjectId

// id 중복확인
export async function findByUserid(userid) {
    return getUsers().find({userid}).next().then(mapOptionalUser)
}

// 회원가입하면 호출할 함수
export async function createUser(user) {
    // 제대로 값 넣었는지 확인
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

// 있다면 문자열로 id를 객체현식으로 반환(없으면 그냥 null이 나올거임)
function mapOptionalUser(user){
    return user ? {...user, id:user._id.toString()} : user
}