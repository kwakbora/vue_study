# vue 시작하기

Node.js 기반 빌드 도구에 익숙하지 않을경우 아래 script 추가하여 확인 할 수 있다.

```html
<!-- 개발버전, 도움되는 콘솔 경고를 포함. -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

```

```html
<!-- 상용버전, 속도와 용량이 최적화됨. -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```




#### Node.js 설치 Vue 시작하기

Vue CLI로 시작하기

```bash
npm install -g @vue/cli
```

폴더생성하기

```bash
create vue-form(폴더이름)
cd vue-form //폴더선택
npm run serve //시작
```


## backend 만들기

```bash
mkdir backend (폴더이름) 생성하기
cd backend
npm init
```

backend 폴더에 package.json 파일 생성됨.

node js express 를 설치 한다.

```bash
npm install express
```

파일을 새로 생성한뒤 ex) index.js 을 넣어준다.

```bash
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hello world!');
})

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})
```

```bash
node .\index.js //localhost 생성
```



### backend 서버통신하기

### axios 사용하기

기존 프로젝트에서 axios로 서버와 통신 하기 위해서는 이를 node_modules에 설치해야한다. 이때 다음과 같은 명령어를 사용하면 된다.

```bash
npm install axios
```

이후 /node_modules에 axios가 추가된 것을 확인할 수 있다.

### proxy 사용하기

fornt 와 back 의 locallost 가 달라 요청 proxy를 이용하여 host 우회하여 요청함.
package.json 과 같은 레벨에 vue.config.js 파일을 생성한뒤 아래 소스를 입력한다.

```bash
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        proxyRoot: true,
        target: 'http://localhost:3000',
        ws: false
      }
    }
  }
}
```

작업과정에서 몇가지 오류 발생하여 해결함.

1.  front에서 vue 실행하면 proxy 가 존재하지 않다고 port 연결을 해주지 않음.

   -> proxyRoot: true 해줬더니 해결됨.

2. WebSocket connection to 'ws://192.168.35.209:8080/ws' failed: Invalid frame header

   -> ws: false 로 해결함.



### npm body parser 사용하기

서버에서 front로 데이터 보낼때 req.body 가 필요한데,

이때 다음과 같은 명령어를 사용하면 된다.

```bash
npm install body-parser
```

그리고  API 소스를 넣어준다.

```js
cont bodyParser = require('body-parser');
app.use(bodyParser.json());
```

그런다음 body 를 사용하면 된다.

```javascript
app.post('/api/account', (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;
  
  console.log(loginId,loginPw)
})
```

### npm cookie parser 사용하기

```bash
npm install cookie-parser
```

그리고  API 소스를 넣어준다.

```js
cont cookieParser = require('cookie-parser');
app.use(cookieParser());
```

그런다음 body 를 사용하면 된다.

```javascript
app.get('/api/account', (req, res) => {

  if(req.cookies && req.cookies.account){
    const member = JSON.parse(req.cookies.account);

    if(member.id){
      return res.send(member);  //쿠키값을 저장해 화면 새로고침을 막는다.
    }
  }
  res.send(401);
})
```

쿠키에 값을 저장해서 쓰게 되면 보안상 문제가 생길 수 있으니, 이를 해결하기 위해서

JWT를 활용해보자.



### JWT 사용하기

```bash
npm install jsonwebtoken
```

그리고  API 소스를 넣어준다.

```javascript
const jwt = require('jsonwebtoken')
```

```javascript
app.get('/api/account', (req, res) => {
  if(req.cookies && req.cookies.token){
    jwt.verify(req.cookies.token, "abcedf1234567", (err,decoded)=>{
      if(err){
       return res.send(401)
      }else{
        res.send(decoded)
      }
    });
    const member = JSON.parse(req.cookies.token);

    if(member.id){
      return res.send(member);  //쿠키값을 저장해 화면 새로고침을 막는다.
    }
  }
  res.send(401);
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
    },"abcedf1234567", { //암호화키
      expiresIn : "10s", //만료시간
      issuer : "boraslib",
    });

    res.cookie("token", token, option);
    res.send(member);
  }else{
    res.send(404);
  }

})
```

### 배포하기

frontend폴더에 vue.config.js 파일을 생성한다.

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../backend/dist"),
  publicPath: './',
  devServer: {
    proxy: {
      "/": {
        proxyRoot: true,
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: false
      }
    }
  }
```

outputDir  로 빌드할 폴더를 지정해준다.

가비아에서 도메인,node.js 호스팅을 구매 후 FTP에  node_modules 폴더를 제외하고 올려준다.

그리고 Termius 다운받아 구매한 호스팅을 연결해준다.

1. ls (폴더확인) / ls -al (폴더 전체확인)
2. cd login(폴더지정)
3. npm install (node 를 설치해준다)
4. node index.js 

**** Termius 를 끄면 화면을 확인 할수 없기 때문에 아래처럼 설치해 줘야 한다.**

1. npm install pm2 -g (pm2 라는 node를 글로벌하게 설치)
2. pm2 start index.js 
3. pm2 ls (현재실행 중인 작업 확인 가능)
