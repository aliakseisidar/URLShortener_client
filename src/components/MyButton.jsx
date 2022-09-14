import React from "react";
import Button from "@mui/material/Button";

const MyButton = (props) => {
  return (
    <Button size="small" variant="outlined" {...props}>
      {props.children}
    </Button>
  );
};

export default MyButton;
