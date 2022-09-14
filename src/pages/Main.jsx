import React, { useState, useContext, useEffect } from "react";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import Services from "../API/Services";
import { AuthContext } from "../context";
import MySnakbarError from "../components/MySnakbarError";
import MyDataTable from "../components/MyDataTable";
import Form1 from "../components/forms/Form1";

function Main() {
  const [urls, setURLs] = useState([]);
  const [urlsChanged, setUrlsChanged] = useState(0);
  const [totalCountOfPages, setTotalCountOfPages] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { token } = useContext(AuthContext);
  const [fetchURLs, isLoadingFetchURLs, errorFetchURLs] = useFetching(
    async () => {
      const urls = await Services.fetchURLs((currentPage - 1) * 10, token);
      setURLs(urls.data.links);
      setTotalCountOfPages(Math.ceil(urls.data.count / 10));
    }
  );
  const [shortURL, isLoadingShortURL, errorShortURL] = useFetching(
    async (longURL, title, tagsStr, token) => {
      await Services.shortURL(longURL, title, tagsStr, token);
      setUrlsChanged(urlsChanged + 1);
    }
  );
  const [deleteURL, isLoadingDeleteURL, errorDeleteURL] = useFetching(
    async (linkId, token) => {
      await Services.deleteURL(linkId, token);
      setUrlsChanged(urlsChanged + 1);
    }
  );

  useEffect(() => {
    fetchURLs();
  }, [urlsChanged, currentPage]);

  return (
    <div className="App">
      <Form1 func={shortURL} isLoadingShortURL={isLoadingShortURL} />
      {errorFetchURLs && (
        <MySnakbarError>
          URLs are not loaded because of: {errorFetchURLs}
        </MySnakbarError>
      )}
      {errorShortURL && (
        <MySnakbarError>
          URL is not shorted because of "{errorShortURL}"
        </MySnakbarError>
      )}
      {errorDeleteURL && (
        <MySnakbarError>
          URL is not deleted because of "{errorDeleteURL}"
        </MySnakbarError>
      )}
      {isLoadingFetchURLs ? (
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
export default Main;
