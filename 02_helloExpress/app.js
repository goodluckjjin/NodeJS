const express = require("express");
const nunjucks = require("nunjucks");

const admin = require("./routes/admin");
const contacts = require("./routes/contacts");

const app = express();
const port = 3000;

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
