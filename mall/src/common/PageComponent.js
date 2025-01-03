//페이지 처리를 담당할 컴포넌트. 공통으로 제작하면 타 컴포넌트에서 가져다 사용할 수 있음.

const PageComponent = ({serverData, movePage}) => {
  //페이징 처리는 listCompo 에 있으므로 그 데이터를 사용함.

  return <div className="m-6 flex justify-center">
    {
      serverData.prev?(
      <div
      className="m-2 p-2 w-16 text-center font-bold text-blue-400"
      onClick={()=>movePage({page:serverData.prevPage})}>
        prev
      </div>
      ) : (
        <></>
      )
    }

    {
      serverData.pageNumList.map(pageNum=>
        <div
        className={`m-2 p-2 w-16 text-center rounded shadow-md  text-blue ${
          serverData.current === pageNum
        }?'bg-gray-500':'bg-blue-400'}`}
        onClick={()=>movePage({page:pageNum})}
        key={pageNum}>
          {pageNum}
        </div>
      )}

    {
      serverData.next?(
      <div
      className="m-2 p-2 w-16 text-center font-bold text-blue-400"
      onClick={()=>movePage({page:serverData.nextPage})}>
        next
      </div>
      ) : (
        <></>
      )
    }
  </div>
}

export default PageComponent;