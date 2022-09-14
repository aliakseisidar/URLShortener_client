//import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import MyNavBar1 from "./components/MyNavBar1";
import "./App.css";
import MyFooter from "./components/MyFooter";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
        token,
        setToken,
        role,
        setRole,
      }}
    >
      <Router>
        <MyNavBar1
          hidden={!isAuth}
          setIsAuth={setIsAuth}
          setToken={setToken}
          setRole={setRole}
        />
        <AppRouter />
        <MyFooter />
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
