import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/img/logo.png";
import { ChannelType, VideoType } from "../../types/types";
import { videosContext } from "../../Provider/VideosProvider";
import { channelsContext } from "../../Provider/ChannelsProvider";
import Scroller from "../Scroller/Scroller";

interface Props {
  theme?: "dark" | "light";
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  header: {
    display: "flex",
    backgroundColor: (props) =>
      props?.theme && props.theme === "dark" ? "#1e2328" : "#3b3f46",
    padding: theme.spacing(2),
    position: "sticky",
    justifyContent: "space-between",
    alignItems: "center",
    top: 0,
    zIndex: 100,
    fontWeight: 600,
    gap: theme.spacing(3),
    ["@media (max-width:960px)"]: {
      flexDirection: "column",
    },
  },
  logo: {
    width: "100px",
    objectFit: "contain",
  },
  box: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    ["@media (max-width:740px)"]: {
      flexDirection: "column",
    },
  },
  button: {
    textTransform: "none",
    backgroundColor: "#3b3f46",
    color: "#fff",
    fontWeight: 600,
    fontSize: "18px",
  },
  nav: {
    listStyle: "none",
    display: "flex",
    gap: "3rem",
    textTransform: "uppercase",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.25rem",
  },
  navLinkActive: {
    color: theme.palette.secondary.main,
  },
}));

const pickRandomly = (
  data: VideoType[] | ChannelType[],
  id: string
): string | undefined => {
  const ids = data
    .map((item) => item[id])
    .filter((item) => item !== undefined && item !== null);
  return ids[Math.floor(Math.random() * ids.length)];
};

const NavBar = React.forwardRef((props: Props, ref) => {
  const classes = useStyles(props);
  const history = useHistory();
  const videos: VideoType[] = React.useContext(videosContext);
  const channels: ChannelType[] = React.useContext(channelsContext);

  return (
    <div className={classes.header}>
      <div style={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
        <Scroller></Scroller>
      </div>
      <div className={classes.box}>
        <img
          src={Logo}
          alt="youvid-analysis"
          className={classes.logo}
          onClick={() => history.push("/")}
        />
        <ul className={classes.nav}>
          <li>
            <Link
              to={`/video/${pickRandomly(videos, "id")}`}
              className={`${classes.navLink} ${
                window.location.hash.includes("/video")
                  ? classes.navLinkActive
                  : ""
              }`}
            >
              Videos
            </Link>
          </li>
          <li>
            <Link
              to={`/channel/${pickRandomly(channels, "channel_id")}`}
              className={`${classes.navLink} ${
                window.location.hash.includes("/channel")
                  ? classes.navLinkActive
                  : ""
              }`}
            >
              Channels
            </Link>
          </li>
          <li>
            <Link
                to={`/categories`}
                className={`${classes.navLink} ${
                    window.location.hash.includes("/categories")
                        ? classes.navLinkActive
                        : ""
                }`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to={`/comparison`}
              className={`${classes.navLink} ${
                window.location.hash.includes("/comparison")
                  ? classes.navLinkActive
                  : ""
              }`}
            >
              Comparison
            </Link>
          </li>
          <li>
            <Link
                to={`/results`}
                className={`${classes.navLink} ${
                    window.location.hash.includes("/results")
                        ? classes.navLinkActive
                        : ""
                }`}
            >
              Results
            </Link>
          </li>
        </ul>
      </div>
      {ref && <SearchBar ref={ref} theme={props.theme}></SearchBar>}
    </div>
  );
});

export default NavBar;
