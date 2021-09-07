import React, { useEffect, useState } from "react";
import axios from 'axios';

function LandingPage() {

    useEffect(() => { //실행한다
        axios.get('/api/hello') //정보를 서버로 보낸다. 앤드포인트는 api/hello
        .then(response => console.log(response)) //보낸 후 서버에서 되돌아오는 응답을 콘솔창에 입력
    }, [])

    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    )
}

export default LandingPage
