import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import ServicesForAdmin from "../API/ServicesForAdmin";
import Services from "../API/Services";
import { AuthContext } from "../context";
import MySnakbarError from "../components/MySnakbarError";
import MyDataTable from "../components/MyDataTable";

function AdminUrlsByUser() {
  const [urls, setURLs] = useState([]);
  const [urlsChanged, setUrlsChanged] = useState(0);
  const [totalCountOfPages, setTotalCountOfPages] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { token } = useContext(AuthContext);
  const params = useParams();
  const [fetchURLs, isLoadingFetchURLs, errorFetchURLs] = useFetching(
    async () => {
      const urls = await ServicesForAdmin.fetchURLsByUser(
        (currentPage - 1) * 10,
        token,
        params.user
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
    fetchURLs();
  }, [urlsChanged, currentPage]);

  return (
    <div className="App">
      {errorFetchURLs && (
        <MySnakbarError>
          {`URLs are not loaded because of: ${errorFetchURLs}`}
        </MySnakbarError>
      )}
      {errorDeleteURL && (
        <MySnakbarError>
          {`URL is not deleted because of "${errorDeleteURL}"`}
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
export default AdminUrlsByUser;
