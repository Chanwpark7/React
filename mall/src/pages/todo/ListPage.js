import { useSearchParams } from "react-router-dom";
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  
  const [queryString] = useSearchParams();

  const page = queryString.get("page")?parseInt(queryString.get("page")):1;
  const size = queryString.get("size")?parseInt(queryString.get("size")):10;

  return(
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Todo List Page Component</div>
      <ListComponent />
    </div>
  );
}

export default ListPage;