/*
  Axios 의 인터셉터 : 서버에 요청/응답시에 추가적인 작업을 수행할 수 있는 기능의 메소드 객체.
  이를 통해서 쿠키로 보단된 Access Token 값을 처리하는 작업이나, 처음으로 Refresh Token 을 사용하는 처리를 할 수 있음.
*/

import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

//JWT Token 을 갱신할 수 있는 기능 정의.
//갱신을 수행하는 서버 API 에 토큰과 리프레쉬 토큰을 같이 보냄.
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = {headers:{
      "Authorization" : `Bearer ${accessToken}`,
  },
  };

  const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`,
      header
  );

  console.log("-----------토큰갱신----------");
  console.log(res.data);

  return res.data;
} 

//요청시 처리함수 정의
const beforeReq = (config) => {
  console.log("요청 전처리 함수;;");

  //요청 처리하기 전에 쿠키를 얻어내고 Authorization 헤더를 구성하고 추가해서 요청 보내기
  //만약 쿠키가 없다면 그냥 예외 발생시킴.
  const memberInfo = getCookie('member');

  if(!memberInfo){
    console.log('Member Not Founded');
    return Promise.reject({
      response:{
        data :
          {
            err:"REQUIRED_LOGIN"
          }
      }
    });
  }

  const {accessToken} = memberInfo;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}

//요청 실패시 처리함수
const requestFail = (err) => {
  console.log('요청 전처리 함수;;;');

  return Promise.reject(err);
}

//응답처리 함수.
const beforeRes = async (res) => {
  console.log('응답처리 함수;;ㅋ' + res.data);

  const data = res.data;

  console.log("data"+data);

  if(data && data.error==='ERROR_TOKEN_ACCESS'){
    const memberCookieValue = getCookie('member');

    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );

    console.log("RefreshJWT Result ====>"+result);

    memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;
    
        setCookie('member',JSON.stringify(memberCookieValue),1);

        //재호출 허가
        const orginalRequest = res.config;

        orginalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

  }

  return res;
}

//응답오류 처리 함수
const responseFail = (err) => {
  console.log('응답 오류 처리 함수;;;' + err);

  return Promise.reject(err);
}

//interceptor 객체를 통한 요청/응답 처리
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;