//리스트 페이지에서 필요한 내용을 API 서버를 통해서
//List 를 get 후 상태 데이터에 매핑함. 이후, 각 DTO 를 하나의 Row 로 변환 해서
//DOM 에 담은 후 ReadPage 에 컴포넌트로 리턴함.

import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/todoApi";
import PageComponent from "../../common/PageComponent";

//초기화 변수(상태 변수 선언, 이 값은 전역에서 사용되므로 함수 외부에 정의)

const initState = {
 dtoList:[], 
  pageNumList:[],
  pageRequestDTO:null,
  prev:false,
  next:false,
  totalCount:0,
  prevPage:0,
  nextPage:0,
  totalPage:0,
  current:0
};

const ListComponent = () => {

  //파라미터로 넘겨지는 page, size 정보 get
  const {page, size, moveToList, moveToRead} = useCustomMove();

  //서버에서 get 하는 상태 데이터 초기화
  const [serverData, setServerData] = useState(initState);

  //랜더링 이후 데이터 get 하도록 useEffect() 정의
  useEffect(()=>{
    //API 컴포넌트로부터 정의된 List 를 얻는 함수 호출
    getList([page,size]).then(data=>{
      console.log(data);
      setServerData(data);
    })
  },[page,size]);
  return(
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {
          serverData.dtoList.map(todo => 
            <div
              className="flex w-full min-w-[400px] p-2 m-2 rounded shadow-md"
              key={todo.tno}
              onClick={()=>moveToRead(todo.tno)}
            >
              <div className="text-1xl m-1 p-2 w-1/12 font-medium">
                {todo.tno}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-1xl m-1 p-2 w-3/12 font-medium">
                {todo.dueDate}
              </div>
            </div>
          )
        }
      </div>
      <PageComponent 
      serverData={serverData} 
      movePage={moveToList}
      />
    </div>
  );
}

export default ListComponent;