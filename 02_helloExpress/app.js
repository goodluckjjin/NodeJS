const express = require("express");
const nunjucks = require("nunjucks");

const admin = require("./routes/admin");
const contacts = require("./routes/contacts");

const app = express();
const port = 3000;

//기본 세팅
// autoescape: true => js가 그대로 노출됨, 사용자가 게시글을 작성할 떄 alert와 같이 tag 사용을 하여 사용자 공격을 할 수 있는 경우들을 무효화시키기 위해 태그 걸러줌 (false면 태그대로 허용)
// autoescape: true인 상태에서 내가 뿌려줘야 하는 경우는
// products {{ message }} 를 아래와 같이 변경한다.
// products {{ message | safe }}
nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.send("express start");
});

//admin까지는 admin파일을 참고해라
app.use("/admin", admin);
app.use("/contacts", contacts);

app.listen(port, () => {
  console.log("Express listening on port", port);
});

//cannot get /fastcampus 는 url, routing을 추가하지 않았기 때문에

//get요청은 내가 url에 쳤을 때 나오는 것
