import { useParams } from "react-router-dom";
import MododifyComponent from "../../components/todo/ModifyComponent";

const ModifyPage = () => {

  const {tno} = useParams();

  return <>
    <div className="text-3xl font-extrabold">Todo Modify page</div>
    <MododifyComponent tno={tno} />
  </>
}

export default ModifyPage;