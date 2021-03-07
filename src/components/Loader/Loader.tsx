import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#1c232c",
  },
  box: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    color: "#fff",
  },
}));
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress() {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
      />
    </div>
  );
}

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <FacebookCircularProgress></FacebookCircularProgress>
        <Typography variant="h4" className={classes.title}>
          Processsing...
        </Typography>
      </div>
    </div>
  );
}

export default Loader;
