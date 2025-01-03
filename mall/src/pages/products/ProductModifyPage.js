import { useParams } from "react-router-dom";
import ProductModifyComponent from "../../components/products/ProductModifyComponent";

const ProductModifyPage = () =>{
    const {pno} = useParams();
    return (
        <div className="p-4 w-full bg-white">
        <div className="text-3xl font-extrabold">
            Product Modify {pno}
        </div>
        <ProductModifyComponent pno={pno}/>
    </div>
    )
}
export default ProductModifyPage;