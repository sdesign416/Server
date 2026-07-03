import jwt, { decode } from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"

const AUTH_ERROR = {message: "인증에러"}

export const isAuth = async(req, res, next) => {
    const authHeader = req.get("Authorization") // postman에 Authorization있음
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        console.log("헤더에러")
        return res.status(401).json(AUTH_ERROR)
    }

    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmNWFhZTk1MjlkMjhmYzFkZDBlZiIsImlhdCI6MTc4MzAzODAzNSwiZXhwIjoxNzgzMTI0NDM1fQ.hUjI_SLeMJBHeFR7opZBK7sW4-ObiAo4X_xmHbNUTn0

    const token = authHeader.split(" ")[1] // Bearer뒤 한칸 띄우고 뒤에 실제 토큰정보만 가져옴
    jwt.verify(token, config.jwt.secretKey, async (error, decode) => {
        if(error){
            console.log("토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decode)
        const user = await authRepository.findById(decode.id)
        if(!user){
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid: ", user.userid)
        req.id = user.id
        req.token = token

        next() // 다음 미들웨어로 넘어감
    })
}


