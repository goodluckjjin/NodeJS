const http = require("http"); // npm 내장 모듈 호출

//express를 사용하지 않고 서버 띄우기
http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello Server35668899101122");
    response.end();
  })
  .listen(3000);

// 내용이 변경될 떄 서버를 내렸다 올리면 번거로우니까 nodemon 설치
// npm install -g nodemon
// nodemon은 시스템 영역쪽에 설치되기 떄문에 해당 폴더 내에서 볼 수 없다.
// nodemon index.js
// 시스템 영역쪽에 설치된 것들은 명령어로 사용할 수 있다.

//
//text/plain은
