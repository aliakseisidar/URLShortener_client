import { useParams, useNavigate } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import MyTag from "../components/MyTag";
import { useFetching } from "../hooks/useFetching";
import Services from "../API/Services";
import MyLoadingButton from "../components/MyLoadingButton";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import MyButton from "../components/MyButton";
import { AuthContext } from "../context";
import MySnakbarError from "../components/MySnakbarError";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const MyPage = () => {
  const [url, setUrl] = useState({
    tags: [],
  });
  const { token } = useContext(AuthContext);
  const [tagsChanged, setTagsChanged] = useState(0);
  const params = useParams();
  const [addTag, isLoadingAddTag, errorAddTag] = useFetching(
    async (url, token, tags) => {
      await Services.updateTags(url, token, tags);
      setTagsChanged(tagsChanged + 1);
    }
  );
  const [fetchURL, isLoadingFetchURL, errorFetchURL] = useFetching(
    async (param, token) => {
      const response = await Services.fetchURL(param, token);
      setUrl(response.data.url);
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchURL(params.id, token);
  }, [tagsChanged]);

  const Row = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="App">
      {errorAddTag && (
        <MySnakbarError>
          Tag is not added because of: {errorAddTag}
        </MySnakbarError>
      )}
      {errorFetchURL && (
        <MySnakbarError>
          URL related data is not loaded because of: {errorFetchURL}
        </MySnakbarError>
      )}
      <Row>
        {isLoadingFetchURL ? (
          <MyLoader />
        ) : (
          <Stack
            m={1}
            divider={<Divider flexItem />}
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
            minWidth={650}
          >
            <h4>Title: {url.title}</h4>
            <p>Initial URL: {url.originalURL}</p>
            <p>Shorted URL: {url.shortURL}</p>
            <p>Clicks: {url.clicks}</p>
            <Stack
              alignItems="flex-start"
              justifyContent="flex-start"
              spacing={1}
            >
              <p>Tags:</p>
              <Grid container spacing={2}>
                {url.tags.map((tag, index) => (
                  <MyTag
                    key={index}
                    tag={tag}
                    url={url}
                    token={token}
                    tagsChanged={tagsChanged}
                    setTagsChanged={setTagsChanged}
                  ></MyTag>
                ))}
                <MyLoadingButton
                  loading={isLoadingAddTag}
                  onClick={() => {
                    const tag = window.prompt("Enter name of tag:");
                    if (tag && !url.tags.includes(tag)) {
                      const tags = [...url.tags, tag];
                      addTag(url, token, tags);
                    } else if (url.tags.includes(tag)) {
                      window.alert("Tag already exists");
                    }
                  }}
                >
                  Add tag
                </MyLoadingButton>
              </Grid>
            </Stack>
            <MyButton variant="text" onClick={() => navigate(-1)}>
              Go back
            </MyButton>
          </Stack>
        )}
      </Row>
    </div>
  );
};

export default MyPage;
