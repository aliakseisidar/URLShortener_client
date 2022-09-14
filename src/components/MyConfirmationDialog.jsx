import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MyConfirmationDialog({
  openDialog,
  confirmAction,
  rejectAction,
  children,
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={rejectAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={rejectAction}>Close</Button>
        <Button onClick={confirmAction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyConfirmationDialog;
