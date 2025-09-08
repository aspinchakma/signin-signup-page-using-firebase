import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Root = () => {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div className="min-h-screen flex flex-col lg:w-[80%] mx-auto w-[90%]">
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="flex-1">
        <Outlet context={setUserInfo} />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
