import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { forwardRef } from "react";

interface Props {
  defaultValue?: string;
  autoFocus?: boolean;
  theme?: "dark" | "light";
}
const useStyles = makeStyles<Theme, Props>((theme) => ({
  input: {
    backgroundColor: (props) =>
      props?.theme && props.theme === "dark" ? "#3b3f46" : "#1e2328",
    border: "none",
    outline: "none",
    borderRadius: "5px",
    width: "28rem",
    color: (props) =>
      props?.theme && props.theme === "dark" ? "#fff" : "#fff",
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

const SearchBar = forwardRef((props: Props, ref) => {
  const classes = useStyles(props);

  return (
    <TextField
      className={classes.focus}
      variant="outlined"
      ref={ref as any}
      autoFocus={props.autoFocus || false}
      placeholder="Search id..."
      id="input-with-icon-textfield"
      defaultValue={props.defaultValue || ""}
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
});

export default SearchBar;
