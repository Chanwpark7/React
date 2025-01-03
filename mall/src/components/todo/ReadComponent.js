//여기서는 useEffect 를 이용해서 read page 가 랜더링될때, 이 모듈을 이용해서
//요청 글번호의 DTO 를 가져와서 초기화된 객체에 매핑을 함.
//이때 deps 를 파람으로 주면서 이 값이 변경되면 effect 가 재실행되도록 정의함.
//이 모듈은 나중에 UI 쪽에서 import 해서 가져다 사용하게 됨.

import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";



const initState = {//초기화 상대 객체 선언
  tno:0,
  title:'',
  writer:'',
  dueDate: null,
  complete: false  
};

const ReadComponent = ({tno})=>{
  //useState 를 이용한 상태값 제어 선언
  const [todo, setTodo] = useState(initState);

  const {moveToList, moveToModify} = useCustomMove();

  useEffect(() => {
    //서버에 데이터 요청 보내기
    getOne(tno).then(data =>{
      console.log(data);
      setTodo(data);
    });
    
  }, [tno]);
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {makeDiv("Tno", todo.tno)}
      {makeDiv("Writer", todo.writer)}
      {makeDiv("Title", todo.title)}
      {makeDiv("DueDate", todo.dueDate)}
      {makeDiv("Complete", todo.complete?'Completed':'Not Yet')}

      <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={()=>moveToList()}>
          List
        </button> 
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={()=>moveToModify(tno)}>
          Modify
        </button> 
      </div>
    </div>
  );
};

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);
export default ReadComponent;