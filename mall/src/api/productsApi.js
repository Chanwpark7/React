//상품 CRUD API
//변수 저장

import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  const header = {
    headers : {"Content-Type" : "multipart/form-data"}
  };
  const res = await jwtAxios.post(`${host}/`, product, header);
  return res.data;
}

export const getList = async(pageParam) => {
  const [page, size] = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params : {
      page: page,
      size: size
    }
  });
  
  return res.data;
};

export const getOne = async (pno) => {
  //const res = await axios.get(`${host}/${pno}`);
  const res = await jwtAxios.get(`${host}/${pno}`);

  return res.data;
};

//수정
export const putOne = async(pno, product) => {
  
  const res = await jwtAxios.put(`${host}/${pno}`,product);
  return res.data;
};

//삭제
export const deleteOne = async(pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`);
  return res.data;
};