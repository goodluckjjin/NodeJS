// const express = require("express");
// const admin = require("./routes/admin");

// const app = express();
// const port = 3000;

// // app.use 는 미드웨어
// //admin까지는 admin파일을 참고해라
// app.use("/admin", admin);

// app.get("/", (req, res) => {
//   res.send("express start");
// });

// app.get("/fastcampus", (req, res) => {
//   res.send("fastcampus get");
// });

// app.listen(port, () => {
//   console.log("Express listening on port", port);
// });

// ******************************* Class 문법 사용 전 *******************************
// const express = require("express");
// const nunjucks = require("nunjucks");
// const logger = require("morgan");
// const bodyParser = require("body-parser"); //express 내장 모듈

// const admin = require("./routes/admin");
// const contacts = require("./routes/contacts");

// const app = express();
// const port = 3000;

// //기본 셋팅
// // autoescape: true => js가 그대로 노출됨, 사용자가 게시글을 작성할 떄 alert와 같이 tag 사용을 하여 사용자 공격을 할 수 있는 경우들을 무효화시키기 위해 태그 걸러줌 (false면 태그대로 허용)
// // autoescape: true인 상태에서 내가 뿌려줘야 하는 경우는
// // products {{ message }} 를 아래와 같이 변경한다.
// // products {{ message | safe }}
// nunjucks.configure("template", {
//   autoescape: true,
//   express: app,
// });

// //미들웨어 셋팅
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/static", express.static("uploads"));

// app.use((req, res, next) => {
//   // req.body = {}
//   app.locals.isLogin = false;
//   // 템플릿에서 url에 접근하기 위한 변수 추가
//   app.locals.req_path = req.path;
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("express start");
// });

// //admin에 한번에 적용하는 미들웨어
// function vipMiddleware(req, res, next) {
//   console.log("최우선 미들웨어");
//   next();
// }

// //admin까지는 admin파일을 참고해라
// app.use("/admin", vipMiddleware, admin);
// app.use("/contacts", contacts);

// // next처리가 불필요하므로 언더바(_)로 대체할 수 있다
// app.use((req, res, _) => {
//   res.status(400).render("common/404.html");
// });

// app.use((req, res, _) => {
//   res.status(500).render("common/500.html");
// });

// app.listen(port, () => {
//   console.log("Express listening on port", port);
// });

// //cannot get ~ 는 url, routing을 추가하지 않았기 때문에

// //REST API
// // GET /user => 사용자정보 요청
// // POST /user => 사용자추가
// // GET /user/(ID) => 한명만 볼 떄
// // PUT /users/(ID) => 한명 수정하기
// // DELETE /users/(ID) => 한명 삭제하기

// // 해당폴더 내에 있는 파일들은 url로 접근하면 전체 다 보이도록 하는 것이 정적파일 셋팅

// ******************************* Class 문법 사용 후 *******************************

const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

class App {
  constructor() {
    this.app = express();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setViewEngine() {
    // env로 접근
    process.env.DB_USER;

    nunjucks.configure("template", {
      autoescape: true,
      express: this.app,
    });
  }

  setStatic() {
    this.app.use("/uploads", express.static("uploads"));
  }

  setLocals() {
    // 템플릿 변수
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404).render("common/404.html");
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      res.status(500).render("common/500.html");
    });
  }
}

module.exports = new App().app;
// 새로운 App 인스턴스가 생성되면서 뿌려주겠다
