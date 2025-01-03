//리스트 페이지로 이동하는 기능의 커스텀 훅 정의

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultvalue) => {
  if(!param){
    return defaultvalue;
  }

  return parseInt(param);
}

const useCustomMove = () => {
  const navigate = useNavigate();

  const[queryString] = useSearchParams();

  const page = getNum(queryString.get('page'),1);
  const size = getNum(queryString.get('size'),10);

  const queryDefault = createSearchParams({page, size}).toString();

  //read 로 이동하는 함수 정의
  const moveToRead = (num) => {
    console.log(num);

    navigate({pathname:`../read/${num}`, search:queryDefault});
  }

  //modify page 로 넘어갈 수 있도록 함수 정의
  const moveToModify = (num) => {
    console.log(num);

    navigate({pathname:`../modify/${num}`, search:queryDefault});
  }

  const moveToList = (pageParam) => {
    let queryStr = '';

    if(pageParam){
      const pageNum = getNum(pageParam.page,1);
      const sizeNum = getNum(pageParam.size,10);

      queryStr = createSearchParams({
        page : pageNum,
        size : sizeNum
      }).toString();
    }else{
      queryStr = queryDefault;
    }

    navigate({pathname:`../list`, search:queryStr})
  };
  return {moveToList, moveToModify, moveToRead, page, size};
}

export default useCustomMove;

