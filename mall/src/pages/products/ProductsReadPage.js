import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

const ProductsReadPage = () => {

  const {pno} = useParams();//파라미터를 분해 하는 hook

  const nav = useNavigate();

  //쿼리스트링 전체를 분해하는 hook
  const [queryString] = useSearchParams();
  
  const page = queryString.get("page")?parseInt(queryString.get("page")):1;
  const size = queryString.get("size")?parseInt(queryString.get("size")):10;

  const moveToModify = useCallback((pno) => {
    //라우터를 이용하지 않고 패스를 줄때는 반드시 백틱을 사용해야 함.
    nav({pathname:`/products/modify/${pno}`});
  },[pno]);

  const moveToList = useCallback(() => {
    nav({pathname:`/products/list`, search: queryString});
  }, [pno, page, size]);

  return<>
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 상세 페이지</div>
      <div>
        <ReadComponent pno = {pno} />
      </div>
    </div>
  </>
}

export default ProductsReadPage;