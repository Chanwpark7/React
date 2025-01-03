//카트내에 정의된 기능을 Thunk 로 구성하고, 이를 이용해 비동기 호출의 상태에 따른 결과를 처리할 수 있도록 함.
//장바구니의 경우, 초기 상태는 빈 배열을 이용하고 API 서버 호출 결과는 모두 장바구니 배열이므로
//이를 상태에 담아서 처리함.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

//모든 데이터는 aPI 서버에서 받아서 처리됨. 즉 의존성이 서버에서 보내주는 데이터에 있음.
//사용자가 로그인 하는 시점에 서버로부터 데이터를 얻어와서 기존에 저장된 카트가 있다면
//초기에 로딩이 되어야 함.

//카트와의 다른 항목들은 중요치 않다면 클라이언트에 저장하도록 함.

//API 처리 모듈 정의
export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync',(param)=>{

  return postChangeCart(param);
});

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
  return getCartItems();
});

const initState = [];

const cartSlice = createSlice({
  name : 'cartSlice',
  initialState : initState,

  extraReducers : (builder)=>{
    builder.addCase(getCartItemsAsync.fulfilled, (state, action) => {
      console.log('getCartItemsAsync fulfilled');
      return action.payload; 
    })
    .addCase(postChangeCartAsync.fulfilled, (state, action) => {
      console.log('postChangeCartAsync fulfilled');
      return action.payload; 
    })
  }
});

export default cartSlice.reducer;