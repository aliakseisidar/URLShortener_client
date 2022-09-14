import React from "react";
import Stack from "@mui/material/Stack";
import cl from "./MyLoader.module.css";

const MyLoader = () => {
  return (
    <Stack direction="row" mt={1} spacing={2} justifyContent="center">
      <div className={cl.bounce}>
        <div className={cl.bounce1}></div>
        <div className={cl.bounce2}></div>
        <div className={cl.bounce3}></div>
      </div>
    </Stack>
  );
};

export default MyLoader;
