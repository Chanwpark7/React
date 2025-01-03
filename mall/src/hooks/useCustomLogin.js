import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom"
import { loginPostAsynch, logout } from "../slices/loginSlice";


const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state)=>state.loginSlice);
  const isLogin = loginState.email ? true:false;

  const doLogin = async(loginParam)=>{
    const action = await dispatch(loginPostAsynch(loginParam));
    return action.payload;
  };

  const doLogout = ()=>{
    dispatch(logout());
  };

  const moveToPath = (path) => {
    navigate({pathname:path},{replace:true});
  };

  const moveToLogin = () =>{
    navigate({pathname:'/member/login'},{replace:true});
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login" />;
  };
  
  const exceptionHandle = (e) => {
    console.log("인증 예외 발생!!!!!");
    console.log(e);

    const errMsg = e.response.data.err;
    const errStr = createSearchParams({error:errMsg}).toString();

    if(errMsg === 'REQUIRED_LOGIN'){
      alert('로그인 안하냐?');
      navigate({pathname:'/member/login', search: errStr});
      return;
    }
    if(e.response.data.err ==='ERROR_ACCESS_DENIED'){
      alert('해당 메뉴를 사용할 권한도 없는게ㅋㅋ');
      navigate({pathname:'member/login', search: errStr});
      return;
    }
  }

  return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle};
}

export default useCustomLogin;