import ProductsListPage from "../pages/products/ProductsListPage";
import ProductsAddPage from "../pages/products/ProductsAddPage";
import { Navigate } from "react-router-dom";
import ProductsReadPage from "../pages/products/ProductsReadPage";
import ProductModifyPage from "../pages/products/ProductModifyPage";

const productsRouter = () => {
  return [{
      path : 'list',
      element : <ProductsListPage />
    },
    {
      path : '',
      element : <Navigate replace to={"list"}/>
    },
    {
      path : 'add',
      element : <ProductsAddPage />
    },
    {
      path : 'read/:pno', /* path 경로의 글번호 등의 파람 매핑은 :변수명 으로 처리. */
      element : <ProductsReadPage />
    },
    {
      path: 'modify/:pno', 
      element: <ProductModifyPage />
    }
  ];
};

export default productsRouter;