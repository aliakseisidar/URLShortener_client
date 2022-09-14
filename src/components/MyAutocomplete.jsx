import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicesForAdmin from "../API/ServicesForAdmin";
import { AuthContext } from "../context";
import useDebounce from "../hooks/useDebounce";
import { useFetching } from "../hooks/useFetching";
import Stack from "@mui/material/Stack";

const MyAutocomplete = () => {
  const { token } = useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState("");
  const deb = useDebounce(inputValue, 1000);
  const [userListForSearch, setUsersForSearch] = useState([]);
  const [
    getUsersForSearch,
    isLoadingGetUsersForSearch,
    errorGetUsersForSearch,
  ] = useFetching(async (offset) => {
    const res = await ServicesForAdmin.getUsers(offset, token, deb);
    setUsersForSearch(res.data.users);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (deb.length === 0) {
      return;
    }
    getUsersForSearch(0);
  }, [deb]);

  return (
    <Stack direction="row" m={2} spacing={2} justifyContent="center">
      <Autocomplete
        onChange={(event, user) => {
          navigate({ pathname: `../${user._id}` });
          setUsersForSearch();
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        loading={isLoadingGetUsersForSearch}
        id="MyAutocompleteForUsers"
        options={userListForSearch}
        getOptionLabel={(el) => el.username}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search by Username" />
        )}
      />
    </Stack>
  );
};

export default MyAutocomplete;
