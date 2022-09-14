import React, { useState, useContext, useEffect } from "react";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import ServicesForAdmin from "../API/ServicesForAdmin";
import { AuthContext } from "../context";
import User1 from "../components/User1";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import MyAutocomplete from "../components/MyAutocomplete";
import MySnakbarError from "../components/MySnakbarError";

const Admin = () => {
  const [userList, setUsers] = useState([]);
  const [totalCountOfPages, setTotalCountOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useContext(AuthContext);

  const [getUsers, isLoadingGetUsers, errorGetUsers] = useFetching(
    async (offset) => {
      const res = await ServicesForAdmin.getUsers(offset, token);
      setUsers([...userList, ...res.data.users]);
      setTotalCountOfPages(Math.ceil(res.data.count / 10));
      if (currentPage + 1 === Math.ceil(res.data.count / 10)) {
        setHasMore(false);
      }
    }
  );

  useEffect(() => {
    getUsers(currentPage * 10);
  }, []);

  const fetchMore = () => {
    if (currentPage + 1 === totalCountOfPages) {
      setHasMore(false);
      return;
    }
    getUsers((currentPage + 1) * 10);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      {errorGetUsers && (
        <MySnakbarError>
          User is not updated because of: {errorGetUsers}
        </MySnakbarError>
      )}
      <MyAutocomplete />
      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={userList.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<MyLoader />}
        >
          <Table minwidth={650} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Password</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user, index) => {
                return (
                  <User1
                    key={user._id}
                    user={user}
                    index={index}
                    userList={userList}
                    setUsers={setUsers}
                  />
                );
              })}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
};

export default Admin;
