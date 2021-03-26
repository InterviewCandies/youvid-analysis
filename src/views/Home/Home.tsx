import classes from "*.module.css";
import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Background from "../../assets/img/register_bg_2.png";
import { ChannelType, VideoType } from "../../types/types";
import { videosContext } from "../../Provider/VideosProvider";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { channelsContext } from "../../Provider/ChannelsProvider";
import { YouTube } from "@material-ui/icons";
import Loader from "../../components/Loader/Loader";
import Scroller from "../../components/Scroller/Scroller";

const useStyles = makeStyles((theme) => ({
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
  logo: {
    ["@media (max-width:700px)"]: {
      width: "300px",
    },
    ["@media (max-width:500px)"]: {
      width: "200px",
    },
    zIndex: 100,
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    gap: "2rem",
  },
  button: {
    padding: "0.75rem 1rem",
    backgroundColor: "#3b3f46",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      color: "#3b3f46",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const videos: VideoType[] = React.useContext(videosContext);
  const channels: ChannelType[] = React.useContext(channelsContext);

  const pickRandomly = (
    data: VideoType[] | ChannelType[],
    id: string
  ): string => {
    const ids = data.map((item) => item[id]);
    let selectedId = null;
    while (!selectedId)
      selectedId = ids[Math.floor(Math.random() * ids.length)];
    return selectedId;
  };

  return (
    <main>
      {videos.length && channels.length ? (
        <section className={classes.root}>
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(${Background})`,
            }}
          ></div>
          <img src={Logo} className={classes.logo}></img>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                history.push(`/video/${pickRandomly(videos, "id")}`);
              }}
            >
              Go to video
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                history.push(
                  `/channel/${pickRandomly(channels, "channel_id")}`
                );
              }}
            >
              Go to channel
            </Button>
          </div>
        </section>
      ) : (
        <Loader></Loader>
      )}
    </main>
  );
}

export default Home;
