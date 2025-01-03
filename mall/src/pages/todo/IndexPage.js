//이 페이지는 todo/ 로 요청이 오면 요청을 처리할 페이지임.
//Outlet 이라는 컴포넌트를 사용할건데, 얘가 하는 일은 부모의 메뉴를 그대로 하위에 표현해주는 기능을 하는 애임.
//따로 추가 작업을 하지 않고 부모의 UI를 그대로 사용할 수 있는 편리한 기능.

import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

  //List, add 의 클릭 이벤트 처리 핸들러 작성.
  //useNavigate() 를 이용해서 처리함.
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({pathname:'list'});
  },[]);

  const handleClickAdd = useCallback(()=>{
    navigate({pathname:'add'});
  },[]);

  return<>
    <BasicLayout>
      <div className="w-full flex m-2 p-2">
        <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickList}>
          List
        </div>
        <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickAdd}>
          Add
        </div>
      </div>
    </BasicLayout>

    <div>
      <Outlet />
    </div>
    </>
}

export default IndexPage;