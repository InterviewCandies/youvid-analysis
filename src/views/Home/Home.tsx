import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Background from "../../assets/img/register_bg_2.png";
import { VideoType } from "../../types/types";
import { videosContext } from "../../Provider/VideosProvider";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

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
}));

function Home() {
  const classes = useStyles();
  const searchRef = useRef(null);
  const videos: VideoType[] = React.useContext(videosContext);
  const history = useHistory();

  useEffect(() => {
    if (searchRef.current)
      //@ts-ignore
      searchRef.current.onkeyup = (e) => {
        //@ts-ignore
        if (e.key === "Enter" || e.keyCode === 13) {
          //@ts-ignore
          const searchKey = e.target.value;
          const video = videos.find((video) => video.id === searchKey.trim());

          if (video?.id) history.push("/video/" + video.id);
          else {
            alert("Video does not exsit");
            //@ts-ignore
            e.target.value = "";
          }
        }
      };
  }, [searchRef, videos]);
  return (
    <main>
      <section className={classes.root}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${Background})`,
          }}
        ></div>
        <img src={Logo} className={classes.logo}></img>
        <SearchBar ref={searchRef} autoFocus></SearchBar>
      </section>
    </main>
  );
}

export default Home;
