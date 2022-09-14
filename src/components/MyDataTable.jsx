import React from "react";
import URLItem from "../components/URLItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function MyDataTable({
  urls,
  deleteURL,
  totalCountOfPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table minwidth={650} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Original URL</TableCell>
              <TableCell align="right">Short URL</TableCell>
              <TableCell align="left">Tags</TableCell>
              <TableCell align="left">Clicks</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, index) => {
              return (
                <URLItem
                  key={url._id}
                  url={url}
                  index={index}
                  deleteURL={deleteURL}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" mt={1} spacing={2} justifyContent="center">
        <Pagination
          count={totalCountOfPages}
          variant="outlined"
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value);
          }}
        />
      </Stack>
    </>
  );
}
export default MyDataTable;
