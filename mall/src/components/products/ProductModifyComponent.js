import { useEffect, useRef, useState } from "react";
import ResultModal from "../../common/ResultModal";
import FetchingModal from "../../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, deleteOne, getOne, putOne } from "../../api/productsApi";

const initState = {
    pno:0,
    pname :'',
    pdesc:'',
    price:0,
    files : [],
    uploadFileNames:[],
    delFlag:false
}

const ProductModifyComponent = ({pno}) => {

    const [product, setProduct] = useState({...initState});
    const [res, setRes] = useState(null);
    const [fetching, setFetching] = useState(false);
    
    const uploadRef = useRef();
  
    const {moveToList, moveToRead} = useCustomMove();
  
    useEffect( ()=>{
      setFetching(true);
      getOne(pno).then((data) => setProduct(data))
      setFetching(false);
    }, [pno]);
  
    const handleChangeproduct = (evt) =>{
        product[evt.target.name] = evt.target.value;
        setProduct({...product});
    }
  
    const handleClickModify = () => {
      const files = uploadRef.current.files;
      console.log(files);

      const formData = new FormData();

      for(let i = 0; i<files.length; i++){
        formData.append('files',files[i]);
      }

      formData.append('pname',product.pname);
      formData.append('pdesc',product.pdesc);
      formData.append('price',product.price);
      formData.append('delflag',product.delflag);
      console.log(formData);
      
      setFetching(true);
      putOne(pno, formData).then((res) =>{
        setFetching(false);
        setRes('수정 완료');
        console.log("성공!")
      })
    }
  
    const handleClickDelete = () =>{
      deleteOne(product.pno).then((res) => {
        setRes("삭제 완료");
      })
    }
  
    const closeModal = () => {
      if(res === '수정 완료'){
        // read 로 다시 보냄.
        moveToRead(pno);
      }
      
      if(res === '삭제 완료'){
        moveToList();
      }
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4"> 

        {fetching? <FetchingModal/> :<></>}
 
        {res ? <ResultModal title={'처리결과'} content={res} callbackFn={closeModal}></ResultModal>  :<></>}
        
              
          <div className="flex justify-center mt-10">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <div className="w-1/5 p-6 text-right font-bold">PNO</div>
              <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                {product.pno}        
              </div>  
            </div>
          </div>

              <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <div className="w-1/5 p-6 text-right font-bold">price</div>
                  <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                   name="price"
                   type={'int'} 
                   value={product.price}
                   onChange={handleChangeproduct}
                   >
                   </input>
                </div>  
              </div>

              <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <div className="w-1/5 p-6 text-right font-bold">pdesc</div>
                  <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                   name="pdesc"
                   type={'text'} 
                   value={product.pdesc}
                   onChange={handleChangeproduct}
                   >
                   </input>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <div className="w-1/5 p-6 text-right font-bold">Files</div>
                  <input 
                    ref={uploadRef} 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    type={'file'} multiple={true}
                  >    
                  </input>
                </div>
              </div>

              <div className="w-full justify-center flex  flex-col m-auto items-center">
                {product.uploadFileNames.map( (imgFile, i) => 
                <>
                <img 
                alt ="product"
                key={i}
                className="p-4 w-1/2" 
                src={`${API_SERVER_HOST}/api/products/view/${imgFile}`}/>
                </>
                )}
              </div>
              

        
              <div className="flex justify-end p-4">
                <button type="button" 
                  className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
                  onClick={handleClickDelete}
                >
                  Delete
                </button>
                <button type="button" 
                  className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                 onClick={handleClickModify}
                >
                  Modify
                </button>  
        
              </div>
            </div>
    )
}
export default ProductModifyComponent;