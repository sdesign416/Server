import express from "express"
import { config } from "./config.mjs"  // config.mjs의 config 객체 가져옴
import { connectDB } from "./db/database.mjs"

const app = express()

// 미들웨어
app.use(express.json())

// 포트번호를 .env에서 설정한 포트번호로 가져올거임
// config.mjs만들고 그 안에 객체를 불러와서 사용함 (config객체의 host의 port로 접근)
// app.listen(config.host.port, () => {
//     console.log("서버 실행 중..")
// })

// db/database.mjs 생성 : 위에 코드에서 db실행하는것도 같이 출력하기 위해 아래로 변경
connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("DB/웹 서버 실행중..")
    })
}).catch(console.error)