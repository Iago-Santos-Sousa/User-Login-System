import { useEffect } from "react";
import Header from "../../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import api from "../../integrations/api";

const Panel = () => {
  // useEffect(() => {
  //   (async () => {
  //     const res = await api.get("/panel");
  //     console.log(res.data);
  //   })();
  // }, []);

  return (
    <div className="h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default Panel;
