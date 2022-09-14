import React from "react";
import { Controller, useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MyInput from "../MyInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import MyButton from "../MyButton";
import { ButtonGroup } from "@mui/material";

const UpdateUserDialog = ({
  openDialog,
  confirmAction,
  rejectAction,
  user,
}) => {
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (data) => {
    if (
      data.username !== user.username ||
      data.password !== user.password ||
      data.role !== user.role
    ) {
      confirmAction(data.username, data.password, data.role);
    } else {
      rejectAction();
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        reset({
          username: user.username,
          password: user.password,
          role: user.role,
        });
        rejectAction();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">{"Update the user"}</DialogTitle>
        <DialogContent>
          <Stack direction="row" m={2} spacing={2} justifyContent="center">
            <Controller
              name="username"
              control={control}
              defaultValue={user.username}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MyInput
                  label={"Enter username"}
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
              defaultValue={user.password}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MyInput
                  label={"Enter password"}
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
                  message: "Password cannot be more than 100 symb.",
                },
              }}
            />
            <Controller
              name="role"
              control={control}
              defaultValue={user.role}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label={"Select role"}
                  select
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  variant="standard"
                  onChange={onChange}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              )}
              rules={{
                required: "It is required field",
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <ButtonGroup aria-label="outlined button group">
            <MyButton
              onClick={() => {
                reset({
                  username: user.username,
                  password: user.password,
                  role: user.role,
                });
                rejectAction();
              }}
            >
              Close
            </MyButton>
            <MyButton type="submit" autoFocus>
              Agree
            </MyButton>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateUserDialog;
