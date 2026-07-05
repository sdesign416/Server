// 큰 틀 섹션
const mainSection = document.getElementById("mSec")
const loginSection = document.getElementById("logSec")
const signupSection = document.getElementById("signSec")
const postSection = document.getElementById("postSec")

// 이동 버튼
const showLoginBtn = document.getElementById("showLoginBtn")
const showSignupBtn = document.getElementById("showSignupBtn")
const backBtns = document.querySelectorAll(".backBtn")

// 로그인기능 작동 요소
const loginUserid = document.getElementById("loginUserid")
const loginPassword = document.getElementById("loginPassword")
const loginBtn = document.getElementById("loginBtn")

// 회원가입기능 작동 요소
const signupUserid = document.getElementById("signupUserid")
const signupPassword = document.getElementById("signupPassword")
const signupName = document.getElementById("signupName")
const signupEmail = document.getElementById("signupEmail")
const signupBtn = document.getElementById("signupBtn")

// 로그아웃 버튼
const logoutBtn = document.getElementById("logoutBtn")

// 글 작성, 목록
const postInput = document.getElementById("postInput")
const addBtn = document.getElementById("addBtn")
const postList = document.getElementById("postList")
const postCount = document.getElementById("postCount")

// 글 조회
const searchUserid = document.getElementById("searchUserid")
const searchBtn = document.getElementById("searchBtn")
const myPostBtn = document.getElementById("myPostBtn")
const allBtn = document.getElementById("allBtn")

// 게시글 작성/조회 화면 전환
const showWriteBtn = document.getElementById("showWriteBtn")
const showSearchBtn = document.getElementById("showSearchBtn")
const postWrite = document.getElementById("postWrite")
const postSearch = document.getElementById("postSearch")

// [1] 화면전환 hidden기능
// [1_1: 모든화면 숨김: 화면전환 시 남아있음 방지]
function hiddenSections(){
    mainSection.classList.add("hidden")
    loginSection.classList.add("hidden")
    signupSection.classList.add("hidden")
    postSection.classList.add("hidden")
}
// [1_2: hidden 클래스 제거하여 화면 노출]
function showMain() {
    hiddenSections()
    mainSection.classList.remove("hidden")
}
function showLogin() {
    hiddenSections()
    loginSection.classList.remove("hidden")
}
function showSignup() {
    hiddenSections()
    signupSection.classList.remove("hidden")
}
function showPost() {
    hiddenSections()
    postSection.classList.remove("hidden")
    // 로그인 후 처음에는 작성/조회 영역 숨김
    postWrite.classList.add("hidden")
    postSearch.classList.add("hidden")
    // 게시글섹션 보일때 목록 함께 출력
    loadPosts()
}

// 화면이동
showLoginBtn.addEventListener("click", showLogin)
showSignupBtn.addEventListener("click", showSignup)
backBtns.forEach((button) => {
    button.addEventListener("click", showMain)
})
showWriteBtn.addEventListener("click", () => {
    postWrite.classList.toggle("hidden")
    postSearch.classList.add("hidden")
})
showSearchBtn.addEventListener("click", () => {
    postSearch.classList.toggle("hidden")
    postWrite.classList.add("hidden")
})

// [2] 회원가입
signupBtn.addEventListener("click", async () => {
    // 입력값 받아옴
    const userid = signupUserid.value.trim()
    const password = signupPassword.value.trim()
    const name = signupName.value.trim()
    const email = signupEmail.value.trim()

    if (!userid || !password || !name || !email){
        alert("정보를 모두 입력하세요.")
        return
    }

    try{
        // 데이터보냄
        const response = await fetch("/auth/signup", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                userid, password, name, email
            })
        })
        // json 객체 변환
        const data = await response.json()
        // 가입 실패
        if (data.message) {
            alert(data.message)
            return
        }
        // 가입 성공
        alert("회원가입 성공! 로그인 해주세요.")
        // 입력창 초기화
        signupUserid.value = ""
        signupPassword.value = ""
        signupName.value = ""
        signupEmail.value = ""

        showLogin()
    }catch (error) {
        console.log("회원가입 실패 :", error)
    }
})

// [3] 로그인
loginBtn.addEventListener("click", async () => {
    // 입력값 가져오기
    const userid = loginUserid.value.trim()
    const password = loginPassword.value.trim()
    // 입력값 확인
    if (!userid || !password) {
        alert("아이디와 비밀번호를 입력하세요.")
        return
    }

    try {
        // 로그인 요청
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userid, password
            })
        })
        // json 객체 변환
        const data = await response.json()
        // 로그인 실패
        if (data.message) {
            alert(data.message)
            return
        }// 로그인 성공: JWT 토큰 저장
        localStorage.setItem("token", data.token)
        localStorage.setItem("userid", data.user.userid)
        // 입력창 초기화
        loginUserid.value = ""
        loginPassword.value = ""

        alert("로그인 성공")
        showPost()
    } catch (error) {
        console.log("로그인 실패 :", error)
    }
})
// 로그인체크 토큰
function checkLogin() {
    const token = localStorage.getItem("token")

    if (token) {
        showPost()
    } else {
        showMain()
    }
}

// [4] 로그아웃
logoutBtn.addEventListener("click", () => {
    // JWT 토큰 삭제
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
    // 다시 메인이동
    showMain()
})

// [5] 게시글 작성
addBtn.addEventListener("click", async () => {
    // 입력값 가져오기
    const text = postInput.value.trim()
    // 입력값 확인
    if (!text) {
        alert("게시글을 입력하세요.")
        return
    }
    try {
        // 저장된 JWT 토큰 가져오기
        const token = localStorage.getItem("token")
        // 게시글 작성 요청
        const response = await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text
            })
        })
        // json 객체 변환
        const data = await response.json()

        if (data.message) {
            alert(data.message)
            return
        }
        // 작성 성공
        alert("게시글 작성 완료")
        // 입력창 비움
        postInput.value = ""
        // 작성 영역 닫기
        postWrite.classList.add("hidden")
        // 전체 게시글 다시 조회
        loadPosts()
    } catch (error) {
        console.log("게시글 작성 실패 :", error)
    }
})

// [6] 조회: 전체 조회(가져오는 기능)
async function loadPosts() {
    try{
        // JWT 토큰 먼저 가져옴 
        const token = localStorage.getItem("token")
        // 조회 API요청 (GET)
        const response = await fetch("/post", {
            headers:{"Authorization": `Bearer ${token}`}
        })
        // json 객체변환
        const data = await response.json()

        if (data.message) {
            postList.innerHTML = `<li>${data.message}</li>`
            postCount.textContent = "총 0개"
            return
        }
        // 응답 배열이면 data, posts로 감싸져있으면 data.posts
        const posts = Array.isArray(data) ? data : data.posts
        // 이제 출력
        renderPosts(posts)
    }catch(error){
        console.log("게시글 조회 실패: ", error)
    }
}

// [6] 조회기능: 전체 조회
allBtn.addEventListener("click", () => {
    // 검색창 비우기
    searchUserid.value = ""

    // 전체 게시글 조회
    loadPosts()
})

// [8] 조회기능: 작성자 userid 조회
searchBtn.addEventListener("click", async () => {
    // 조회할 userid 받아옴
    const userid = searchUserid.value.trim()
    if (!userid) {
        alert("조회할 userid를 입력하세요.")
        return
    }
    try {
        // JWT 토큰 먼저 가져옴 
        const token = localStorage.getItem("token")
        // 전체 게시글 조회
        const response = await fetch("/post", {
            headers: {"Authorization": `Bearer ${token}`}
        })
        // json 객체변환
        const data = await response.json()

        if (data.message) {
            alert(data.message)
            return
        }
        // 응답 배열이면 data, posts로 감싸져있으면 data.posts
        const posts = Array.isArray(data) ? data : data.posts
        // 가져온 전체 게시글 중 입력한 userid와 같은 글만 필터링
        const filteredPosts = posts.filter((post) => post.userid === userid)
        // 출력
        renderPosts(filteredPosts)
    } catch (error) {
        console.log("작성자 게시글 조회 실패 :", error)
    }
})

// [9] 조회기능: 내 글 조회
myPostBtn.addEventListener("click", async () => {
    // 내 userid 받아옴(localStorage에서)
    const userid = localStorage.getItem("userid")
    if (!userid) {
        alert("로그인 정보가 없습니다.")
        return
    }

    try {
        // JWT 토큰 먼저 가져옴 
        const token = localStorage.getItem("token")
        // 전체 게시글 조회
        const response = await fetch("/post", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        // json 객체변환
        const data = await response.json()

        if (data.message) {
            alert(data.message)
            return
        }
        // 응답 배열이면 data, posts로 감싸져있으면 data.posts
        const posts = Array.isArray(data) ? data : data.posts
        // 전체 게시글 중 로그인한 사용자의 글만 필터링
        const myPosts = posts.filter((post) => post.userid === userid)
        // 출력
        renderPosts(myPosts, true)
    } catch (error) {
        console.log("내 게시글 조회 실패 :", error)
    }
})

// [7] 글 목록 출력(눈에 실제 보이는)
function renderPosts(posts, isMine = false) {
    // 기존 목록 초기화
    postList.innerHTML = ""
    // 게시글이 없을 경우
    if (!posts || posts.length === 0) {
        postList.innerHTML = "<li>게시글이 없습니다.</li>"
        postCount.textContent = "총 0개"
        return
    }
    // 게시글 개수 출력
    postCount.textContent = `총 ${posts.length}개`
    // 게시글 배열 반복
    posts.forEach((post) => {
        const li = document.createElement("li")
        li.innerHTML = `
            <div class="info">
                <div class="writer">
                    ${post.name || "작성자 없음"}
                    <span>${post.userid || ""}</span>
                </div>
                <div class="number">
                    글번호 : ${post._id}
                </div>
                <div class="content">
                    ${post.text || ""}
                </div>
                <div class="date">
                    ${post.createdAt || ""}
                </div>
                ${isMine ? `
                    <div class="btn-box">
                        <button class="editBtn" onclick="editPost('${post._id}')">수정</button>
                        <button class="deleteBtn" onclick="deletePost('${post._id}')">삭제</button>
                    </div>
                ` : ""}
            </div>
        `
        postList.appendChild(li)
    })
}

// [10] 내 글 조회 > 수정
async function editPost(id) {
    // 수정할 내용 입력
    const text = prompt("수정할 내용을 입력하세요.")
    // 취소를 누르거나 아무것도 입력하지 않으면 종료
    if (!text || text.trim() === "") {
        return
    }

    try {
        // JWT 토큰 가져오기
        const token = localStorage.getItem("token")
        // 수정 요청
        await fetch(`/post/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 로그인 사용자 인증
                "Authorization": `Bearer ${token}`
            },
            // 수정할 내용 전달
            body: JSON.stringify({
                text
            })
        })
        // 수정 후 내 게시글 다시 조회
        myPostBtn.click()
    } catch (error) {
        console.log("게시글 수정 실패 :", error)
    }
}

// [11] 내 글 조회 > 삭제
async function deletePost(id) {
    // 삭제 여부 확인
    const check = confirm("정말 삭제하시겠습니까?")
    // 취소 누르면 종료
    if (!check) {
        return
    }

    try {
        // JWT 토큰 가져오기
        const token = localStorage.getItem("token")
        // 삭제 요청
        await fetch(`/post/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        // 삭제 후 내 게시글 다시 조회
        myPostBtn.click()
    } catch (error) {
        console.log("게시글 삭제 실패 :", error)
    }
}



// 프로그램 실핼 시 한 번 실행
checkLogin()