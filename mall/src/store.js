//모든 컴포넌트들이 공통으로 사용하는 저장소를 설정함.
//하나의 맵에는 하나의 context 같은 store 를 저장하고 사용함.

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './slices/loginSlice'
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    cartSlice: cartSlice
  }
})