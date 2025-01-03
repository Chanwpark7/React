import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import About from "../pages/About";
import IndexPage from "../pages/todo/IndexPage";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import ProductsIndexPage from "../pages/products/ProductsIndexPage";
import memberRouter from "./memberRouter";

//path 에 따른 컴포넌트를 보여줄지를 결정하는 역할을 하는 함수.
const root = createBrowserRouter([
  {
    path : '',
    element : <MainPage />
  },
  {
    path : 'about',
    element : <About />
  },
  {
    path : 'todo',
    element : <IndexPage />,
    children : todoRouter()
  },
  {
    path : 'products',
    element : <ProductsIndexPage />,
    children : productsRouter()
  },
  {
    path : "member",
    children : memberRouter()
  }
])

export default root;