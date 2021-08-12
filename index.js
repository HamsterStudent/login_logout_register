const express = require('express') //express 모듈을 가져오기
const app = express() //새로운 function을 이용해서 새로운 express app을 만들기
const port = 2241 //포트 번호는 아무렇게나 해도 됨.
const bodyParser = require('body-parser'); //body-parser를 가져오기. 옵션 설정이 조금 필요함

const config = require('./config/key')

const { User } = require("./models/User");
//회원가입 데이터 수집 위해 User모델을 가져오기

//클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게. body-parser 설정
app.use(bodyParser.urlencoded({extended: true})); //application/x-www-form-urlencoded 타입으로 된 데이터를 분석해서 가져올 수 있게.
app.use(bodyParser.json()); //application/json 타입으로 된 데이터를 분석해서 가져올 수 있게

const mongoose = require('mongoose') //mongoose 모듈을 가져오기

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //이 항목들을 입력해야 에러가 안남
}).then(()=> console.log('MongoDB Connected...')) //연결되면 콘솔창에 연결된다고 뜬다
    .catch(err => console.log(err)) //연결된 게 아니라면 콘솔창에 에러를 보여주기



app.get('/', (req, res) => {
  res.send('Hello World!')
})
//익스프레스 앱을 넣은 후에, 루트 디렉토리에 오면 Hello World라는 것을 출력되게 하기.
//function(req, res){} 형식도 되나, 간편하게 하기 위해 화살표함수로 사용한듯...
// app.get('/', function(req, res){ res.send('Hello World!')}) //function형식


//회원가입 라우트
app.post('/register', (req, res) => {

  //회원가입 할 때 필요한 정보들을 client에서 가져오면, 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)
  //req.body안에 json형식으로 id, password등의 정보가 들어있음. boay-parser를 이용해야 함 

  //moongoDB에서 오는 메소드. 정보들이 유저 모델에 저장됨
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })

})


app.listen(port, () => {
  console.log(`Starship enterprise landing on port ${port}`)
})
//위에서 지정한 포트에서 앱을 실행되게 하는 것. 앱이 포트의 응답을 들으면 콘솔이 터미널에 프린트