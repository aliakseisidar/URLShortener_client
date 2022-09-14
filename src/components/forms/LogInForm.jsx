import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MyInput from "../MyInput";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MyLoadingButton from "../MyLoadingButton";

function LogInForm({ func, loading, title }) {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    func(data.username, data.password);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ minWidth: "500px" }} spacing={2} mt={2}>
        <h1>{title}</h1>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MyInput
              label={"Enter Email"}
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            required: "It is required field",
            maxLength: {
              value: 100,
              message: "Email cannot be more than 100 symb.",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email should be provided",
            },
          }}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MyInput
              label={"Enter password"}
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
            required: "It is required field",
            maxLength: {
              value: 100,
              message: "Password cannot be more than 100 symb.",
            },
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <MyLoadingButton
            loading={loading}
            type="submit"
            style={{ width: "200px" }}
          >
            {title}
          </MyLoadingButton>
        </Stack>
      </Stack>
    </form>
  );
}

export default LogInForm;
