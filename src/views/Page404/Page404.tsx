import classes from "*.module.css";
import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Background from "../../assets/img/register_bg_2.png";
import { VideoType } from "../../types/types";
import { videosContext } from "../../Provider/VideosProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#1c232c",
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  heading: {
    color: "#fff",
    fontWeight: 600,
    fontSize: "12rem",
    zIndex: 100,
    ["@media (max-width:800px)"]: {
      fontSize: "8rem",
    },
    ["@media (max-width:500px)"]: {
      fontSize: "5rem",
    },
  },
  subtitle: {
    color: "#fff",
    fontWeight: 600,
    fontSize: "5rem",
    zIndex: 100,
    ["@media (max-width:800px)"]: {
      fontSize: "3rem",
    },
    ["@media (max-width:500px)"]: {
      fontSize: "2rem",
    },
  },
}));

function Page404() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <main>
      <section className={classes.root}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${Background})`,
          }}
        ></div>
        <Typography className={classes.heading}>404</Typography>
        <Typography className={classes.subtitle}>Page not found</Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          style={{ fontWeight: 600 }}
          onClick={() => history.push("/")}
        >
          Go Home
        </Button>
      </section>
    </main>
  );
}

export default Page404;
