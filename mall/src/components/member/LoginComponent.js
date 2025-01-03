/*
  Email 과 password 를 입력 받아서 로그인을 처리하는 용도로 정의.
*/

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, loginPostAsynch } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  email:'',
  pw:'',
};

const LoginComponent = ()=>{
  const [loginParam, setLoginParam] = useState({...initState});

  const {doLogin, moveToPath} = useCustomLogin();

  const handleChange = (evt)=>{
    loginParam[evt.target.name] = evt.target.value;

    setLoginParam({...loginParam});
  }

  /*
    login 요청시 리듀셔를 호출하고 이를 userDispatch() 를 이용해서 app 내의 상태를 변경.
  */

  //userDispatch 함수 객체 선언.
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickLogin = () => {
    //dispatch(login(loginParam)); //login slice 의 login() 을 동작하도록 호출
    //dispatch(loginPostAsynch(loginParam))
    doLogin(loginParam)//custom hook 을 이용한 dispatch 대체
    .then((data)=>{
      console.log(`after unwrap;;`)
      console.log(data);

      if(data.error){
        alert('이메일 패스워드 확인')
      }else{
        alert('로그인 성공')
        moveToPath('/');//custom hook 을 이용한 redirection 연결
      }
    })
  };
    

  return(
    <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
      </div> 
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" 
          name="email"
          type={'text'} 
          value={loginParam.email}
          onChange={handleChange}
          >
          </input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" 
          name="pw"
          type={'password'} 
          value={loginParam.pw}
          onChange={handleChange}
          >
          </input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button 
              className="rounded p-4 w-36 bg-blue-500 text-xl  text-white"
              onClick={handleClickLogin}  
              >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent />
    </div>
  );
}

export default LoginComponent;