//import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
      {/* <div className="flex">
        이 Link 를 이용하면 <a> 가 아닌 컴포넌트 내부에서 랜더링을 처리함.
        <Link to={"/about"}>Go To About Page</Link>
      </div> */}

  return (
      <BasicLayout>
        <div className="text-3xl">
          <div>Main Page 입니다.</div>
        </div>
      </BasicLayout>
  );
};

export default MainPage;