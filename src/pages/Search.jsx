import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import Services from "../API/Services";
import { AuthContext } from "../context";
import Stack from "@mui/material/Stack";
import MySnakbarError from "../components/MySnakbarError";
import MyDataTable from "../components/MyDataTable";

function Search() {
  const [urls, setURLs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [urlsChanged, setUrlsChanged] = useState(0);
  const [totalCountOfPages, setTotalCountOfPages] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { token } = useContext(AuthContext);
  const [searchURLs, isLoadingSearchURLs, errorSearchURLs] = useFetching(
    async () => {
      const urls = await Services.searchURLs(
        (currentPage - 1) * 10,
        token,
        searchParams.get("tag"),
        searchParams.get("title")
      );
      setURLs(urls.data.links);
      setTotalCountOfPages(Math.ceil(urls.data.count / 10));
    }
  );

  const [deleteURL, isLoadingDeleteURL, errorDeleteURL] = useFetching(
    async (linkId, token) => {
      await Services.deleteURL(linkId, token);
      setUrlsChanged(urlsChanged + 1);
    }
  );

  useEffect(() => {
    searchURLs();
  }, [urlsChanged, currentPage, searchParams]);

  return (
    <div className="App">
      {searchParams.get("title") ? (
        <Stack direction="row" m={2} spacing={2} justifyContent="flex-start">
          Search by title: <b>{searchParams.get("title")}</b>
        </Stack>
      ) : (
        <Stack direction="row" m={2} spacing={2} justifyContent="flex-start">
          Search by tag: <b>{searchParams.get("tag")}</b>
        </Stack>
      )}
      {errorSearchURLs && (
        <MySnakbarError>
          {`URLs are not loaded because of: ${errorSearchURLs}`}
        </MySnakbarError>
      )}
      {errorDeleteURL && (
        <MySnakbarError>
          {`URL is not deleted because of "${errorDeleteURL}"`}
        </MySnakbarError>
      )}
      {isLoadingSearchURLs ? (
        <MyLoader />
      ) : (
        <MyDataTable
          urls={urls}
          deleteURL={deleteURL}
          totalCountOfPages={totalCountOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
export default Search;
