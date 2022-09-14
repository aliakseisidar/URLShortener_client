import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetching } from "../hooks/useFetching";
import Services from "../API/Services";
import MySnakbarError from "./MySnakbarError";

const MyTag = ({ tag, url, tagsChanged, setTagsChanged, token }) => {
  const [removeTag, isLoadingRemoveTag, errorRemoveTag] = useFetching(
    async (url, token, tags) => {
      await Services.updateTags(url, token, tags);
      setTagsChanged(tagsChanged + 1);
    }
  );

  const TagOnPage = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    paddingLeft: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid style={{ padding: "2px" }} item xs="auto">
      {errorRemoveTag && (
        <MySnakbarError>
          Tag is not removed because of: {errorRemoveTag}
        </MySnakbarError>
      )}
      <TagOnPage>
        {tag}
        <LoadingButton
          loading={isLoadingRemoveTag}
          variant="text"
          size="small"
          onClick={() => {
            const tags = url.tags.filter((el) => el !== tag);
            removeTag(url, token, tags);
            console.log(token);
          }}
          style={{ minWidth: "10px" }}
        >
          <DeleteIcon fontSize="small" />
        </LoadingButton>
      </TagOnPage>
    </Grid>
  );
};

export default MyTag;
