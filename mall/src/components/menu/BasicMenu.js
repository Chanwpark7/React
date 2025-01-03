import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicMenu = () => {

  //리듀서를 이용해서 로그인 상태 여부를 조회 해봄. 초기값은 email key 의 값이 있는 상태를 뒀기 때문에 null 나옴.
  //useSelector(콜백함수) : 이 함수는 reduce 의 login,out을 호출할때 사용하는 redux 내부 hook

  const loginState = useSelector((state) => state.loginSlice);

  return (
    <nav id="navBar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-300">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={'/'}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={'/about'}>About</Link>
          </li>
          {loginState.email ? (
            <>
              <li className="pr-6 text-2xl">
                <Link to={'/todo/'}>Todo</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/products/'}>Products</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
        {!loginState.email?(
          <div className="text-white text-sm m-1 rounded">
            <Link to={'/member/login'}>Login</Link>
          </div>
          ):(<div className="text-white text-sm m-1 rounded">
            <Link to={'/member/logout'}>Logout</Link>
          </div>)}
      </div>
    </nav>
  );
}

export default BasicMenu;