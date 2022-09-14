import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import MyInput from "../MyInput";
import MyLoadingButton from "../MyLoadingButton";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../../context";

const Form1 = ({ func, isLoadingShortURL }) => {
  const { token } = useContext(AuthContext);

  const { handleSubmit, control, reset, getValues, clearErrors } = useForm();

  const onSubmit = (data) => {
    func(data.longURL, data.title, data.tagsStr, token);
    reset({ longURL: "", title: "", tagsStr: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onBlur={() => {
        const { longURL, title, tagsStr } = getValues();
        if (!longURL && !title && !tagsStr) {
          clearErrors();
        }
      }}
    >
      <Stack direction="row" m={2} spacing={2} justifyContent="center">
        <Controller
          name="longURL"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MyInput
              label={"Enter URL"}
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            required: "It is required field",
            maxLength: {
              value: 2048,
              message: "URL cannot be more than 2048 symb.",
            },
            pattern: {
              value:
                /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
              message: "URL should be provided",
            },
          }}
        />
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MyInput
              label={"Enter title"}
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            required: "It is required field",
            maxLength: {
              value: 100,
              message: "Title cannot be more than 100 symb.",
            },
          }}
        />
        <Controller
          name="tagsStr"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MyInput
              label={"Enter tags (space separated)"}
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            maxLength: {
              value: 100,
              message: "Tags cannot be more than 100 symb.",
            },
          }}
        />
        <MyLoadingButton type="submit" loading={isLoadingShortURL}>
          Short It
        </MyLoadingButton>
      </Stack>
    </form>
  );
};

export default Form1;
