import { RouterProvider } from "react-router-dom";
import root from "./router/root";

function App() {
  return (
    //기본 router 를 지정
    //이때 사용하는 컴포는 아래와 같음.
    <RouterProvider router={root} />
  );
}

export default App;