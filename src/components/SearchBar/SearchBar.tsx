import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { forwardRef } from "react";

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#3b3f46",
    border: "none",
    outline: "none",
    borderRadius: "5px",
    width: "40rem",
    color: "#fff",
    ["@media (max-width:700px)"]: {
      width: "19rem",
    },
    ["@media (max-width:500px)"]: {
      width: "18rem",
    },
  },
  focus: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: "none",
        outline: "none",
        boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
      },
      "&:hover fieldset": {
        border: "none",
        outline: "none",
        boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
      },
    },
  },
  icon: {
    color: "#d8d8d8",
    marginLeft: "15px",
  },
}));

const SearchBar = forwardRef(
  (
    { defaultValue, autoFocus }: { defaultValue?: string; autoFocus?: boolean },
    ref
  ) => {
    const classes = useStyles();

    return (
      <TextField
        className={classes.focus}
        variant="outlined"
        ref={ref as any}
        autoFocus={autoFocus || false}
        placeholder="Search video..."
        id="input-with-icon-textfield"
        defaultValue={defaultValue || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className={classes.icon}></Search>{" "}
            </InputAdornment>
          ),
          className: classes.input,
        }}
      />
    );
  }
);

export default SearchBar;
