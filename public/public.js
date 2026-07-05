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
