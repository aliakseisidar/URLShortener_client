import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import MyLoadingButton from "./MyLoadingButton";
import MyButton from "./MyButton";
import { AuthContext } from "../context";
import { useFetching } from "../hooks/useFetching";
import ServicesForAdmin from "../API/ServicesForAdmin";
import MySnakbarError from "./MySnakbarError";
import MyConfirmationDialog from "./MyConfirmationDialog";
import Typography from "@mui/material/Typography";
import UpdateUserDialog from "./forms/UpdateUserDialog";

const User1 = ({ user, index, userList, setUsers }) => {
  const { username, password, role } = user;

  const [openDialogForDelete, setOpenDialogForDelete] = useState(false);
  const [openDialogForUpdate, setOpenDialogForUpdate] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [updateUser, isLoadingUpdateUser, errorUpdateUser] = useFetching(
    async (username, password, role) => {
      const res = await ServicesForAdmin.updateUser(
        token,
        user,
        username,
        password,
        role
      );
      if (res.status === 200)
        setUsers(
          userList.map((el) => {
            if (el._id === user._id) {
              return { ...el, username, password, role };
            }
            return el;
          })
        );
    }
  );

  const [deleteUser, isLoadingDeleteUser, errorDeleteUser] = useFetching(
    async () => {
      const res = await ServicesForAdmin.deleteUser(user._id, token);
      if (res.status === 200)
        setUsers(userList.filter((el) => el._id !== user._id));
    }
  );

  const confirmActionForDelete = async () => {
    setOpenDialogForDelete(false);
    await deleteUser();
  };
  const rejectActionForDelete = () => {
    setOpenDialogForDelete(false);
  };

  const confirmActionForUpdate = async (username, password, role) => {
    setOpenDialogForUpdate(false);
    await updateUser(username, password, role);
  };
  const rejectActionForUpdate = () => {
    setOpenDialogForUpdate(false);
  };

  return (
    <>
      {errorUpdateUser && (
        <MySnakbarError>
          User is not updated because of: {errorUpdateUser}
        </MySnakbarError>
      )}
      {errorDeleteUser && (
        <MySnakbarError>
          User is not updated because of: {errorDeleteUser}
        </MySnakbarError>
      )}
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">
          <Typography>{username}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{password}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{role}</Typography>
        </TableCell>
        <TableCell align="right">
          <MyLoadingButton
            loading={isLoadingUpdateUser}
            onClick={() => {
              setOpenDialogForUpdate(true);
            }}
          >
            Edit
          </MyLoadingButton>
          <ButtonGroup aria-label="outlined button group">
            <MyLoadingButton
              loading={isLoadingDeleteUser}
              onClick={() => {
                setOpenDialogForDelete(true);
              }}
            >
              DELETE
            </MyLoadingButton>
            <MyButton onClick={() => navigate({ pathname: `../${user._id}` })}>
              VIEW URLs
            </MyButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <MyConfirmationDialog
        key="confirmationForDeleteUser"
        openDialog={openDialogForDelete}
        confirmAction={confirmActionForDelete}
        rejectAction={rejectActionForDelete}
      >
        Do you want to delete user? URLs created by this user will be deleted
        too.
      </MyConfirmationDialog>
      <UpdateUserDialog
        key="dialogForUpdateUser"
        openDialog={openDialogForUpdate}
        confirmAction={confirmActionForUpdate}
        rejectAction={rejectActionForUpdate}
        user={user}
      />
    </>
  );
};

export default User1;
