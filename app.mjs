import express from "express"
import { config } from "./config.mjs"  // config.mjs의 config 객체 가져옴
import { connectDB } from "./db/database.mjs"
import authRouter from "./router/auth.mjs"
import postsRouter from "./router/posts.mjs"
// public용
import path from "path"
import { fileURLToPath } from "url"

const app = express()

// __dirname 생성(public용)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 미들웨어 등록
app.use(express.json())

// public 미들웨어 등록
app.use(express.static(path.join(__dirname, "public")))

// API
app.use("/auth", authRouter)
app.use("/post", postsRouter)

// 404 (항상 마지막)
app.use((req, res) => {
    res.sendStatus(404)
}) 


// db/database.mjs 생성 : 위에 코드에서 db실행하는것도 같이 출력하기 위해 아래로 변경
connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("DB/웹 서버 실행중..")
    })
}).catch(console.error)