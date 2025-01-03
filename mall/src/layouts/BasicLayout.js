//이 파일은 컴포넌트 상단 화면에 공통적인 메뉴, 링크를 보여주고,
//하위에는 각 페이지의 컴포넌트를 출력하도록 정의.

import BasicMenu from "../components/menu/BasicMenu";
import CartComponent from "../components/menu/CartComponent";

const BasicLayout = ({children}) => {

  return(
    <>
      {/* <header className="bg-teal-400 p-5">
        <h1 className="text-2xl md:text-4xl">header</h1>
      </header> */}
      <BasicMenu />

      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <main className="bg-sky-300 md:w-2/3 lg:w-3/4 px-5">
          {children}
        </main>

        <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 flex py-5">
          <CartComponent/>
        </aside>
      </div>
    </>
  )
};
export default BasicLayout;