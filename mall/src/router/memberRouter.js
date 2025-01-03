import KakaoRedirectPage from "../pages/member/KakaoRedirectPage";
import LoginPage from "../pages/member/LoginPage"
import LogoutPage from "../pages/member/LogoutPage";
import ModifyPage from "../pages/member/ModifyPage";

const memberRouter = () => {
  return[
    {
      path : "login",
      element : <LoginPage />
    },
    {
      path : "logout",
      element : <LogoutPage />
    },
    {
      path : 'kakao',
      element : <KakaoRedirectPage />
    },
    {
      path : 'modify',
      element : <ModifyPage />
    }
  ]
}

export default memberRouter;