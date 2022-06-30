const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(express.static('public'));

const members = [
  {
    id:3,
    name:'이순신',
    loginId : 'bora@naver.com',
    loginPw : '1'
  },
  {
    id:4,
    name:'홍길동',
    loginId : 'bbora@naver.com',
    loginPw : '2'
  }
]
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/api/account', (req, res) => {

  if(req.cookies && req.cookies.token){
    jwt.verify(req.cookies.token, "abcedf1234567", (err,decoded)=>{
      if (err.name === 'TokenExpiredError') { // 유효기간 초과
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다',
        });
      }else{
        res.send(decoded)
      }
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
      });

    });
    const member = JSON.parse(req.cookies.token);

    if(member.id){
      return res.send(member);  //쿠키값을 저장해 화면 새로고침을 막는다.
    }
  }
  //res.send(406);
})

app.post('/api/account', (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;

  //console.log(loginId,loginPw)

  const member = members.find(m=> m.loginId === loginId && m.loginPw === loginPw)
  if(member){

    const option = {
      domain : "localhost",
      path: "/",
      httpOnly : true,
    }
    const token = jwt.sign({
      id : member.id,
      name : member.name,
    }, process.env.JWT_SECRET, { //암호화키
      expiresIn : "10s", //만료시간
      issuer : "boraslib",
    });

     res.cookie({
      code: 200,
      option,
      message: '토큰이 발급되었습니다',
      token,
    });

    //res.cookie("token", token, option);
    res.send(member);
  }else{
    res.send(404);
  }

})

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})

app.delete('/api/account', (req, res) => {
  if(req.cookie && req.cookie.token){
    res.clearCookie("token");
  }
  res.send(200);
})