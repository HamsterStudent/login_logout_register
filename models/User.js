const mongoose = require('mongoose'); //몽구스 불러오기

const userSchema = mongoose.Schema({
    name: {
        type: String, // 문자열 타입
        maxlength: 50  //글자수 제한
    },
    email: {
        type: String,
        trim: true, //trim은 문자 사이의 간격을 없애주는 역할을 함
        unique: 1 //중복 이메일은 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5 //글자수 제한
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //관리자, 등급
        type: Number,
        default: 0 //역할을 지정하지 않으면 임의로 0을 주겠다
    },
    image: String,
    token: { //토큰을 이용하여 유효성 같은 걸 관리할 수 있다
        type: String
    },
    tokenExp: { 
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸기

module.exports = {User} //모듈을 다른 곳에서도 쓸 수 있게 내보내기
