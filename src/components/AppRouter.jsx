import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import About from "../pages/About";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import MyLoader from "./UI/MyLoader/MyLoader";
import Search from "../pages/Search";
import Admin from "../pages/Admin";
import AdminUrlsByUser from "../pages/AdminUrlsByUser";

const AppRouter = () => {
  const { isAuth, isLoading, role } = useContext(AuthContext);

  if (isLoading) {
    return <MyLoader />;
  }

  if (isAuth && role === "user") {
    return (
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="main">
          <Route index={true} element={<Main />} />
          <Route exact path=":id" element={<MyPage />} />
        </Route>
        <Route path="search">
          <Route index={true} element={<Search />} />
          <Route exact path=":id" element={<MyPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    );
  } else if (isAuth && role === "admin") {
    return (
      <Routes>
        <Route path="admin">
          <Route index={true} element={<Admin />} />
          <Route exact path=":user">
            <Route index={true} element={<AdminUrlsByUser />} />
            <Route exact path=":id" element={<MyPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
};

export default AppRouter;
