const mongoose = require('mongoose'); //몽구스 불러오기
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

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


//몽구스에서 가져온 메소드. user.save하기 전에 비밀번호를 암호화
userSchema.pre('save', function( next ){
    var user = this;
    //이 위의 정보들을 나타냄. user.password는 이 정보들 중의 패스워드 부분을 나타냄

    //비밀번호가 변했을 때에만 비밀번호를 암호화
    if(user.isModified('password')){

        //비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt){

            if(err) return next(err)
            //에러가 나면 err로 보내주기

            bcrypt.hash(user.password, salt, function(err, hash){
                //hash는 암호화된 비밀번호를 나타냄

                if(err) return next(err)
                //에러가 나면 err로 보내주기

                user.password = hash

                next()
                //다시 index.js의 save로 보내기
            })
        })
    }else {
        next()
    }
    
})


//plainpassword와 암호화된 비밀번호가 같은지 체크
userSchema.methods.comparePassword = function(plainPassword, cb){

    //암호화된 비밀번호를 복호화할수는 없기 때문에 plainpassword를 암호화 해서 암호화된 비밀번호랑 같은지 체크해야함.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);

        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;

    //jsonwebtoken을 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    //token을 해석할 때 'secretToken'을 넣으면 user._id가 나오는 거

    user.token = token //유저 토큰은 var로 정의한 토큰을 넣어줌
    user.save(function(err, user){ //유저를 저장한 후 함수 실행. 
        if(err) return cb(err) //에러가 있다면 콜백으로 에러 전달
        cb(null, user) //세이브가 잘 됐다면 에러는 없고(null) 유저 정보만 전달
    })

}



const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸기

module.exports = { User } //모듈을 다른 곳에서도 쓸 수 있게 내보내기
