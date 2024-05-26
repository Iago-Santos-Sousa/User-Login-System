import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import Panel from "../pages/Panel/Panel";
import Error404 from "../pages/Error404/Error404";
import CreateUser from "../pages/CreateUser/CreateUser";
import UserDetails from "../pages/UserDetails/UserDetails";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="panel" element={<Panel />}>
          <Route path="user-details/:userId" element={<UserDetails />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
