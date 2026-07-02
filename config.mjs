import dotenv from "dotenv"

// .env파일 읽음
dotenv.config()

// 검증함수
function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue
    if (value == null){
        throw new Error(`키 ${key}는 undefined`)
    }
    return value
}

// 외부에서 사용가능한 객체 생성
export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC"))
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)) // 기본값 10
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080)) // 기본값 8080
    },
    db: {
        host: required("DB_HOST")
    }
}