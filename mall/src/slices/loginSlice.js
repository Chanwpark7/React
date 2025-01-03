/*
  store 가 App 에서 Context 역할을 담당한다면 (모든 컴포넌트가 참조 가능한 전역 상태 데이터 관리 context),
  이를 처리하는 애는 reducer 라는 함수. 즉 reducer 는 context 의 상태 데이터를 가공하는 역할을 담당함.

  각 컴포넌트들은 Action 을 이용해서 리듀서를 호출하고, 리듀서는 액션의 지정된 값을 처리해서 보관될 맵 상태 데이터를 반환함.

  이를 처리하기 위해 reducer 를 정의하는데 내부적으로는 리듀서이름(컴포에서 참조함.), 관리할 상태창, 액션명을 설정해서 초기화 함.
  이를 외부에 export 해서 각 컴포넌트가 사용하는 형태를 취하도록 설계됨.
*/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

//이 리듀서는 로그인/아웃을 처리하는 목적으로 email 의 상태값을 초기값으로 갖고 이 값이 존재하는지의 여부에 따라서
//리액트에서 로그인/아웃을 판별할 것.

//초기 상태 데이터 email.
const initState = {
  email:''
}

//쿠키가 있는지를 먼저 찾아보고 없는 경우엔 기본값을 갖도록 구성. 어플리케이션이 초기화될때 slice 도 초기화 되므로
//member 쿠키가 있는 상태가 된 후엔 리프레시를 해도 로그인 상태가 유지됨.
//이를 위한 코드
const loadMemberCookie = () => {
  const memberInfo = getCookie('member');

  //console.log("쿠키 정보 ??!!"+memberInfo.nickname);

  if(memberInfo && memberInfo.nickname){
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
}

export const loginPostAsynch = createAsyncThunk('loginPostAsynch',(param)=>{
  return loginPost(param);
});

const loginSlice = createSlice({
  //오픈될 이름
  name : "loginSlice",
  initialState : loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log('login;;;;')

      //리듀서가 전달받은 데이터를 확인할 수 있음. 그 데이터는 두번째 파라미터인 action 객체의 속성인 payload 라는 애를 이용해서 get 가능
      //리듀스 데이터 확인
      const data = action.payload;

      setCookie('member', JSON.stringify(data), 3);

      console.log(data);

      //return {email: data.email};
      return data;
    },
    logout: (state, action) => {
      console.log('logout;;;;')
      removeCookie("member");

      return {...initState};
    }
  },
  //thunk() 에 따라서 동작하는 콜백 함수인 extraReducers 를 정의. 이때, 상태와 action 을 위해 정의한 것과 같고,
    //파라미터를 받는 부분만 변경됨.
    extraReducers:(builder) => {
      builder
      .addCase(loginPostAsynch.fulfilled, (state, action) =>{
        console.log(`fullfilled`);
        const payload = action.payload;

        //쿠키 세팅 단, 쿠키에 값은 반드시 문자열로 저장. 객체는 안됨.
        setCookie('member', JSON.stringify(payload),1);

        //loadMemberCookie();

        return payload;
      })
      .addCase(loginPostAsynch.pending, (state,action)=>{
        console.log(`pending`);
        const payload = action.payload;
        return payload;
      })
      .addCase(loginPostAsynch.rejected, (state,action)=>{
        console.log(`rejecting`);
        const payload = action.payload;
        return payload;
      });
    }
  });

export const {login,logout} = loginSlice.actions;
export default loginSlice.reducer;