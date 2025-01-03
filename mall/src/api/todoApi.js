//axio 를 이용할 때 사용되는 모듈을 미리 정의해서 필요시에 가져다 씀.
//axio 는 ajax 와 비슷함. 문법이 다를 뿐.
//순서 : 1. 요청을 보낼 host 정보 저장
//  2. 저장은 host 명에 따른 path 만 변경.
//  3. asynch 를 이용해서 비동기 통신함. 이때, await 을 통해서 서버에 데이터를 요청.
//  4. 리턴되거나 에러가 발생할텐데, 결과객쳉의 속성인 data 를 까보면서 결과 확인함.
//  5. 일반적으로 에러가 발생하면 예외가 수반됨.

import axios from 'axios';
import jwtAxios from '../util/jwtUtil';

//변수 저장
export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/todo`;

//신규 todo 등록 처리
export const postAdd = async (todoObj) =>{
  const res = await jwtAxios.post(`${prefix}/`,todoObj);

  return res.data;
}

//하나의 Todo 항목을 get 하는 함수 정의
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

//목록을 리턴하는 함수 정의
export const getList = async(pageParam) => {
  const [page, size] = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params : {
      page: page,
      size: size
    }
  });
  
  return res.data;
};

//modify
export const putOne = async (todoObj) =>{
  const res = await jwtAxios.put(`${prefix}/${todoObj.tno}`,todoObj);

  return res.data;
}

//delete
export const deleteOne = async (tno) =>{
  const res = await jwtAxios.delete(`${prefix}/${tno}`);

  return res.data;
}