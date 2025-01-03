import { Navigate } from "react-router-dom";
import ListPage from "../pages/todo/ListPage";
import TodoRead from "../pages/todo/TodoRead";
import AddPage from "../pages/todo/AddPage";
import ModifyPage from "../pages/todo/ModifyPage";

const todoRouter = () => {

  return(
    [
      {
        path : 'list',
        element : <ListPage />
      },
      {
        path : '',
        element : <Navigate replace to={"list"}/>
      },
      {
        path : 'read/:tno', /* path 경로의 글번호 등의 파람 매핑은 :변수명 으로 처리. */
        element : <TodoRead />
      },
      {
        path : 'add',
        element : <AddPage />
      },
      {
        path : 'modify/:tno',
        element : <ModifyPage />
      }
    ]
  );
}

export default todoRouter;