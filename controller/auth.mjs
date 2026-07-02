import express from "express"
import * as authRepository from "../data/auth.mjs"
import * as bcrypt from "bcrypt"
import { config } from "../config.mjs"
import jwt from "jsonwebtoken"

// 회원가입 기능
export async function signup(req, res) {
    const {userid, password, name, email} = req.body
    // 중복id 체크
    const found = await authRepository.findByUserid(userid)
    if(found){
        return res.status(409).json({message: `${userid}이 이미 있습니다.`})
    }
    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds)
    // 회원가입
    const user = await authRepository.createUser({
        userid, password: hashed, name, email
    })
    // 가입완료 후
    const token = await createJwtToken(user.id)
    console.log(token)
    // 출력용
    res.status(201).json({token, user})
}

// 로그인
export async function login(req, res) {
    const {userid, password} = req.body
    const user = await authRepository.findByUserid(userid)
    if(user){
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(401).json({message: "아이디 또는 비밀번호 확인!"})
        }
        const token = await createJwtToken(user.id)
        res.status(200).json({token, user})
    }else{

    }
    
}

// 로그인 유지 체크
export async function me(req, res) {

}

// 토큰함수
async function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec
    })
}
