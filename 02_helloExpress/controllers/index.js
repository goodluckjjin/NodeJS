//모든 폴더별 위치
const { Router } = require("express");
const router = Router();

router.use("/admin", require("./admin"));
// router.use("/contacts", require("./contacts"));

// contact 관련해서 만들고 싶을때 admin과 같이 만들고 contacts폴더를 생성한 후 내부에 index.js와 contacts.ctrl.js 파일을 생성해 주어야 한다.
// 파일 생성을 안 해주면 다음과 같은 오류 발생 : TypeError: Router.use() requires middleware function but got a Object

module.exports = router;
