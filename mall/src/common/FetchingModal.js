//시간이 걸리는 작업이 수행될 때 그 상황을 봉여주는 모달 창.


const FetchingModal = () => {

  return (
    <div className="{`fixed top-0 left-0 z-[1005] flex h-full w-full place-items-center 
    justify-center bg-black bg-opacity-20`}">
      <div className="bg-white rounded-3xl opacity-100 min-w-min 
      h-1/4 min-w-[600px] flex justify-center items-center">
        <div className="text-4xl font-extrabold text-orange-400 m-20">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default FetchingModal;