import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../context";
import { useFetching } from "../hooks/useFetching";
import ServicesForUser from "../API/ServicesForUser";
import MySnakbarError from "../components/MySnakbarError";
import LogInForm from "../components/forms/LogInForm";
import SignUpForm from "../components/forms/SignUpForm";

const Login = () => {
  const { setIsAuth, setToken, setRole } = useContext(AuthContext);

  let [logIn, isLoadinLogIn, errorLogIn, resetErrorLogIn] = useFetching(
    async (username, pass) => {
      const res = await ServicesForUser.logIn(username, pass);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setIsAuth(true);
        setToken(res.data.token);
        setRole(res.data.role);
      }
    }
  );

  const [signUp, isLoadingSignUp, errorSignUp, resetErrorSignUp] = useFetching(
    async (username, pass) => {
      const res = await ServicesForUser.signIn(username, pass);
      if (res.status === 200) {
        logIn(username, pass);
      }
    }
  );

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <LogInForm func={logIn} loading={isLoadinLogIn} title={"Log In"} />
      <h1>OR</h1>
      <SignUpForm func={signUp} loading={isLoadingSignUp} title={"Sign Up"} />
      {errorLogIn && (
        <MySnakbarError resetError={resetErrorLogIn}>
          You are not logged in because of: {errorLogIn}
        </MySnakbarError>
      )}
      {errorSignUp && (
        <MySnakbarError resetError={resetErrorSignUp}>
          You are not signed in because of: {errorSignUp}
        </MySnakbarError>
      )}
    </Stack>
  );
};

export default Login;
