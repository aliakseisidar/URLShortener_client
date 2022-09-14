import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import MyButton from "./MyButton";
import MyLoadingButton from "./MyLoadingButton";
import { AuthContext } from "../context";
import MyConfirmationDialog from "./MyConfirmationDialog";

const URLItem = ({ url, index, deleteURL }) => {
  const navigate = useNavigate();

  const [isLoadingDelete, setIsLoadingDetele] = useState(false);
  const { token, role } = useContext(AuthContext);

  const TagOnMain = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //variables fot dialog for delete URL
  const [openDialogForDelete, setOpenDialogForDelete] = useState(false);
  const confirmActionForDelete = async () => {
    setOpenDialogForDelete(false);
    try {
      setIsLoadingDetele(true);
      await deleteURL(url._id, token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDetele(false);
    }
  };
  const rejectActionForDelete = () => {
    setOpenDialogForDelete(false);
  };

  return (
    <>
      <MyConfirmationDialog
        key="confirmationForDeleteURL"
        openDialog={openDialogForDelete}
        confirmAction={confirmActionForDelete}
        rejectAction={rejectActionForDelete}
      >
        Do you want to delete URL?
      </MyConfirmationDialog>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="right">{url.createdAt.slice(0, 10)}</TableCell>
        <TableCell align="right">{url.title}</TableCell>
        <TableCell align="right">
          {url.originalURL.length > 40
            ? `${url.originalURL.slice(0, 40)}...`
            : url.originalURL}
        </TableCell>
        <TableCell align="right">{url.shortURL}</TableCell>
        <TableCell align="right">
          <Grid container spacing={2}>
            {url.tags.length === 0 ? (
              <Grid item xs="auto">
                No tags
              </Grid>
            ) : (
              url.tags.map((el, index) => {
                return (
                  <Grid key={index} item xs="auto">
                    <IconButton
                      sx={{ padding: "0px" }}
                      onClick={() => {
                        navigate({
                          pathname: "/search",
                          search: `?tag=${el}`,
                        });
                      }}
                    >
                      <TagOnMain>{el}</TagOnMain>
                    </IconButton>
                  </Grid>
                );
              })
            )}
          </Grid>
        </TableCell>
        <TableCell align="right">{url.clicks}</TableCell>
        <TableCell align="right">
          <ButtonGroup aria-label="outlined button group">
            <MyLoadingButton
              loading={isLoadingDelete}
              onClick={() => {
                setOpenDialogForDelete(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </MyLoadingButton>
            <MyButton
              onClick={() => {
                if (role === "admin") {
                  navigate({ pathname: `../${url.path}` });
                } else if (role === "user") {
                  navigate({ pathname: `../${url.path}` });
                }
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </MyButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </>
  );
};

export default URLItem;
