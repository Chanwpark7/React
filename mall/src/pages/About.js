import useCustomLogin from "../hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";

const About = () => {

  const {isLogin,moveToLoginReturn} = useCustomLogin();
  if(!isLogin){
    return moveToLoginReturn();
  }
  return (
    
    <BasicLayout>
      <div className="text-3xl">About Page 입니다.</div>
    </BasicLayout>
  );
};

export default About;