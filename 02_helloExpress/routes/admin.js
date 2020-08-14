const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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
