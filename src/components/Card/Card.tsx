import classes from "*.module.css";
import {
  CircularProgress,
  Icon,
  makeStyles,
  SvgIconTypeMap,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Search } from "@material-ui/icons";
import React from "react";

interface Props {
  title: string;
  content: string | number;
  color: string;
  endorment: JSX.Element;
  theme?: "dark" | "light";
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    padding: theme.spacing(3),
    position: "relative",
    minWidth: "150px",
    borderRadius: "5px",
    backgroundColor: (props) =>
      props?.theme && props.theme === "dark" ? "#3b3f46" : "#fff",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
  },
  title: {
    fontWeight: 700,
    color: "#a0aec0",
    textAlign: "left",

    textTransform: "uppercase",
    ["@media (min-width:1275px)"]: {
      fontSize: "13px",
    },
    ["@media (min-width:1500px)"]: {
      fontSize: "16px",
    },
  },
  number: {
    fontSize: theme.spacing(3),
  },
  icon: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "#fff",
    backgroundColor: (props) => props.color || "#000",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
  },
}));
function Card(props: Props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{props.title}</Typography>
      <Typography variant="h4" className={classes.number}>
        {props.content}
      </Typography>
      <Icon className={classes.icon}>{props.endorment}</Icon>
    </div>
  );
}

export default Card;
