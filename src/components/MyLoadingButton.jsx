import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const MyLoadingButton = (props) => {
  return (
    <LoadingButton size="small" variant="outlined" {...props}>
      {props.children}
    </LoadingButton>
  );
};

export default MyLoadingButton;
