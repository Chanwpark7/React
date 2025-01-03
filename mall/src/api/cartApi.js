//요청에 따른 카트 정보를 API 서버에 요청하기

import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);

  return res.data;
}

export const postChangeCart = async (cartItem) => {
  
  console.log(cartItem);
  
  const res = await jwtAxios.post(`${host}/change`, cartItem);

  console.log(res.data);
  

  return res.data;
}