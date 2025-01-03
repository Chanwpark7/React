import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = "f3c80981b8b954ee2c06cc6932a238f1";
const redirect_uri = "http://localhost:3000/member/kakao";
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
const access_token_url = "https://kauth.kakao.com/oauth/token";
const host = API_SERVER_HOST;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

//1. 클라이언트가 카카오 로그인을 요청하면 인가 코드를 리턴
//2. 리다이렉트 URI 에서 인가코드를 획득 후 Access Code 를 재요청
//3. Access Code 를 받으면 이 코드를 서버에 전송하는것이 메뉴얼.

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
    "Content-Type":"application/x-www-form-urlencoded"
    }
  };

  const params = {
    grant_type:"authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode
  };

  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;

  return accessToken;
};

export const getMemberWithAccessToken = async(accessToken) => {

  const res = await axios.get(`${host}/api/member/kakao?accessToken=${accessToken}`);

  return res.data;
}