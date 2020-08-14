const express = require("express");
const router = express.Router();

function testMiddleware(req, res, next) {
  console.log("첫번째 미들웨어");
  next();
}

function testMiddleware2(req, res, next) {
  console.log("두번째 미들웨어");
  next();
}

// 실제 사용 예시
// function loginRequired (req, res, next) {
//   if(로그인이 되어있지 않으면) {
//     res.redirect(로그인창으로)
//   } else {
//     next();
//   }
// }

router.get("/", testMiddleware, testMiddleware2, (req, res) => {
  res.send("admin 이후 url");
});

router.get("/products", (req, res) => {
  // res.send("admin products 이후 url");
  //app.js에세팅된 template 이후부터 파일 위치를 지정해준다.
  res.render("admin/products.html", {
    //products.html의 message에 뿌려준다
    message: `<h1>태그가 출력됩니다.</h1>`,
    online: "express",
  });
});
module.exports = router;

//GET /admin => admin 이후 url
//GET /admin/products => admin products 이후 url
