import express from "express"
import { isAuth } from "../middleware/auth.mjs"
import * as postController from '../controller/posts.mjs';

const router = express.Router()

// 전체 post 가져오기
// http://127.0.0.1:8080/post (GET)
// http://127.0.0.1:8080/post?userid=apple (GET)
router.get("/", isAuth, postController.getPosts)


// 글번호에 대한 post 가져오기

// post 쓰기
// http://127.0.0.1:8080/post
router.post("/", isAuth, postController.createPost) // isAuth: 로그인 된 사용자만

// post 수정

// post 삭제


export default router