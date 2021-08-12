//환경변수. development모드일 때와 production모드일 때 어떤 파일을 출력할건지 정해줌
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
