import { useSearchParams } from "react-router-dom";
import ListComponent from "../../components/products/ListComponent";

const ProductsListPage = () => {

  const [queryString] = useSearchParams();

  const page = queryString.get("page")?parseInt(queryString.get("page")):1;
  const size = queryString.get("size")?parseInt(queryString.get("size")):10;

  return(
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 List 페이지</div>
      <ListComponent/>
    </div>
  );
};

//몰/products --> List 요청처리하도록 함.

export default ProductsListPage;