const express = require('express') //express 모듈을 가져오기
const app = express() //새로운 function을 이용해서 새로운 express app을 만들기
const port = 2241 //포트 번호는 아무렇게나 해도 됨.

const mongoose = require('mongoose') //mongoose 모듈을 가져오기

mongoose.connect('mongodb+srv://chekov2241:22412222@coconut.lcm3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //이 항목들을 입력해야 에러가 안남
}).then(()=> console.log('MongoDB Connected...')) //연결되면 콘솔창에 연결된다고 뜬다
    .catch(err => console.log(err)) //연결된 게 아니라면 콘솔창에 에러를 보여주기



app.get('/', (req, res) => {
  res.send('Hello World! Good Day')
})
//익스프레스 앱을 넣은 후에, 루트 디렉토리에 오면 Hello World라는 것을 출력되게 하기.
//function(req, res){} 형식도 되나, 간편하게 하기 위해 화살표함수로 사용한듯...

app.listen(port, () => {
  console.log(`Enterprise starship landing on port ${port}`)
})
//위에서 지정한 포트에서 앱을 실행되게 하는 것. 앱이 포트의 응답을 들으면 콘솔이 터미널에 프린트