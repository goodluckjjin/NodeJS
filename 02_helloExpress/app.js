const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); //express 내장 모듈

const admin = require("./routes/admin");
const contacts = require("./routes/contacts");

const app = express();
const port = 3000;

//기본 셋팅
// autoescape: true => js가 그대로 노출됨, 사용자가 게시글을 작성할 떄 alert와 같이 tag 사용을 하여 사용자 공격을 할 수 있는 경우들을 무효화시키기 위해 태그 걸러줌 (false면 태그대로 허용)
// autoescape: true인 상태에서 내가 뿌려줘야 하는 경우는
// products {{ message }} 를 아래와 같이 변경한다.
// products {{ message | safe }}
nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

//미들웨어 셋팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("uploads"));

app.use((req, res, next) => {
  req.body = {};
});

app.get("/", (req, res) => {
  res.send("express start");
});

//admin에 한번에 적용하는 미들웨어
function vipMiddleware(req, res, next) {
  console.log("최우선 미들웨어");
  next();
}

//admin까지는 admin파일을 참고해라
app.use("/admin", vipMiddleware, admin);
app.use("/contacts", contacts);

app.listen(port, () => {
  console.log("Express listening on port", port);
});

//cannot get /fastcampus 는 url, routing을 추가하지 않았기 때문에

//get요청은 내가 url에 쳤을 때 나오는 것

//REST API
// GET /user => 사용자정보
// POST /user => 사용자추가
// GET /user/(ID) => 한명만 볼 떄
// PUT /users/(ID) => 한명 수정하기
// DELETE /users/(ID) => 한명 삭제하기

// 해당폴더 내에 있는 파일들은 url로 접근하면 전체 다 보이도록 하는 것이 정적파일 셋팅
