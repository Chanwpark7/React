import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const TodoRead = () => {

  const {tno} = useParams();//파라미터를 분해 하는 hook

  const nav = useNavigate();

  //쿼리스트링 전체를 분해하는 hook
  const [queryString] = useSearchParams();
  
  const page = queryString.get("page")?parseInt(queryString.get("page")):1;
  const size = queryString.get("size")?parseInt(queryString.get("size")):10;

  const moveToModify = useCallback((tno) => {
    //라우터를 이용하지 않고 패스를 줄때는 반드시 백틱을 사용해야 함.
    nav({pathname:`/todo/modify/${tno}`});
  },[tno]);

  const moveToList = useCallback(() => {
    nav({pathname:`/todo/list`, search: queryString});
  }, [tno, page, size]);

  return<>
    <div className="text-3xl font-extrabold">
      Todo Read Page Component {tno}, {page}, {size}
      <div>
        <ReadComponent tno = {tno} />
      </div>
    </div>
  </>
}

export default TodoRead;