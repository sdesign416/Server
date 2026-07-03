import express from "express"
import * as authController from "../controller/auth.mjs" // 전부 다 가져옴
import { isAuth } from "../middleware/auth.mjs"

const router = express.Router()

// 회원가입
// http://127.0.0.1:8080/auth/signup (POST)
router.post("/signup", authController.signup)

// 로그인
// http://127.0.0.1:8080/auth/login (POST)
router.post("/login", authController.login)

// 로그인 유지 체크
// http://127.0.0.1:8080/auth/me (GET)
router.get("/me", isAuth, authController.me) // GET방식으로 들어오면 isAuth이거 먼저 진행 > authController진행(isAuth의 next()함수로 인해)


export default router