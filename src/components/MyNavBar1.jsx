import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HttpIcon from "@mui/icons-material/Http";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LoadingButton from "@mui/lab/LoadingButton";
import MyInput from "./MyInput";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { AuthContext } from "../context";

const MyNavBar1 = ({ setIsAuth, setToken, setRole, ...props }) => {
  const navigate = useNavigate();
  const [titleForSearch, setTitleForSearch] = useState("");
  const { role } = useContext(AuthContext);

  return (
    <Box {...props} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{
              color: "#fff",
              display: { xs: "none", md: "flex" },
              mr: 1,
              padding: "0px",
            }}
            onClick={() => {
              navigate({
                pathname: "/main",
              });
            }}
          >
            <HttpIcon sx={{}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>

          {role === "admin" && (
            <Link underline="hover" color="#fff" href="/">
              Users
            </Link>
          )}
          <Stack
            direction="row"
            m={2}
            p={1}
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(255, 255, 255, 0.05)"
            borderRadius={2}
          >
            <SearchIcon style={{ marginRight: "5px" }} />
            <MyInput
              sx={{ input: { color: "#fff" } }}
              value={titleForSearch}
              placeholder="Search by Title ..."
              onChange={(e) => {
                setTitleForSearch(e.target.value);
              }}
            />

            <LoadingButton
              loading={false}
              sx={{ color: "#fff", minWidth: "30px" }}
              onClick={() => {
                setTitleForSearch("");
                if (role === "user") {
                  navigate({
                    pathname: "/search",
                    search: `?title=${titleForSearch}`,
                  });
                } else if (role === "admin") {
                  navigate({
                    search: `?username=${titleForSearch}`,
                  });
                }
              }}
            >
              <ArrowForwardIosIcon fontSize="inherit" />
            </LoadingButton>
          </Stack>
          <Button
            color="inherit"
            onClick={() => {
              setIsAuth(false);
              setToken("");
              setRole("");
              localStorage.removeItem("token");
            }}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MyNavBar1;
