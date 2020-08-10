// const express = require('express')
const uuid4 = require("uuid4"); // 설치된 외부 모듈 사용시 경로설정X
console.log(uuid4);
console.log(uuid4()); //uuid4 고유 id 출력

//nodemodules 폴더를 삭제했더라도 package.jason의 dependencies에 남아있기 떄문에 npm install을 해주면 폴더가 다시 복구된다.

//사용자는 요청 Request(URL접속, form 전송)하고, //////서버는 응답 Response(텍스트, 이미지)한다.
