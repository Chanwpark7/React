import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from 'react-redux';
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');
  const dispatch = useDispatch();
  const {moveToPath} = useCustomLogin();

  useEffect(()=>{
    getAccessToken(authCode).then(access_token=>{
      console.log(access_token);

      getMemberWithAccessToken(access_token).then((memberInfo)=>{
        console.log(';;;;;;;;;;;;;;;;;'+memberInfo);

        dispatch(login(memberInfo));

        //소셜 회원 여부에 따른 페이지 이동
        if(memberInfo&&!memberInfo.formSns){
          moveToPath("/");
        }else{
          moveToPath("/member/modify");
        }
      });
    })
  },[authCode]);

  return (
    <div>
      <div>카카오 로그인 redirect</div>
      <div>${authCode}</div>
    </div>
  )
}

export default KakaoRedirectPage;