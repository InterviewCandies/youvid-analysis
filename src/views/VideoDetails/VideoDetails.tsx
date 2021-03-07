import {
  Button,
  CircularProgress,
  Grid,
  Icon,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import fs from "fs";
import SearchBar from "../../components/SearchBar/SearchBar";
import ReactPlayer from "react-player";
import Card from "../../components/Card/Card";
import {
  AssignmentInd,
  Comment,
  Search,
  TouchApp,
  YouTube,
} from "@material-ui/icons";
import {
  ChannelAvancedDetails,
  ChannelOverview,
  CommentType,
  VideoAvancedDetails,
  VideoOverview,
  VideoType,
} from "../../types/types";
import Comments from "../../components/Comments/Comments";
import Papa from "papaparse";
import { Mapper } from "../../utils/mapper";
import { formatNumber } from "../../utils/numberFormatHelper";
import { videosContext } from "../../Provider/VideosProvider";
import { commentsContext } from "../../Provider/CommentsProvider";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Logo from "../../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
  },
  videoSection: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: theme.spacing(4),
    "& > :not(:first-child)": {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
  video: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(5),
  },
  icon: {
    color: "#fff",
    backgroundColor: VideoOverview["comments"].color,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0.5),
  },
  border: {
    borderTop: "3px solid #cecece",
  },
  logo: {
    width: "100px",
    objectFit: "contain",
  },
  heading: {
    fontWeight: 600,
    fontSize: theme.spacing(4),
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    backgroundColor: "#1e2328",
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
  box: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    ["@media (max-width:740px)"]: {
      flexDirection: "column",
    },
  },
  loading: {
    dipsplay: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    width: "100%",
  },
  comments: {
    width: "100%",
    height: "90vh",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
    borderRadius: "16px",
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    overflow: "auto",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#3b3f46",
    color: "#fff",
    fontWeight: 600,
    fontSize: "18px",
  },
}));

interface Props {
  primary: string;
  secondary: string;
}

const useCardStyles = makeStyles<Theme, Props>((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minWidth: "200px",
    borderRadius: "5px",
    backgroundColor: (props) => props.primary,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
    "& > :nth-child(even)": {
      backgroundColor: (props) => props.secondary,
    },
  },
  cardRow: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(3),
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function CardDetails({ video }: { video: VideoType }) {
  const classes = useCardStyles({ secondary: "#fff", primary: "#f1f1f1" });

  return (
    <Grid container className={classes.card}>
      <div className={classes.cardRow} style={{ justifyContent: "center" }}>
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Video
        </Typography>
      </div>
      {VideoAvancedDetails.map((item) => (
        <div className={classes.cardRow}>
          <Typography variant="h6">{item}</Typography>
          <Typography variant="h6">
            {formatNumber(video[Mapper[item]] || 0)}
          </Typography>
        </div>
      ))}
    </Grid>
  );
}

function ChannelOverviewCard({ video }: { video: VideoType }) {
  const classes = useCardStyles({ primary: "#4299e1", secondary: "#67ade7" });

  return (
    <Grid container className={classes.card} style={{ color: "#fff" }}>
      <div className={classes.cardRow} style={{ justifyContent: "center" }}>
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Channel
        </Typography>
      </div>
      {ChannelAvancedDetails.map((item) => (
        <div className={classes.cardRow}>
          <Typography variant="h6">{item.replace("Channel ", "")}</Typography>
          <Typography variant="h6">
            {formatNumber(video[Mapper[item]] || 0)}
          </Typography>
        </div>
      ))}
    </Grid>
  );
}

function VideoDetails() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<Boolean>(true);
  const videos: VideoType[] = React.useContext(videosContext);
  const comments: CommentType[] = React.useContext(commentsContext);
  const url = window.location.hash;
  const id: string = url.substring(url.lastIndexOf("/") + 1);
  const currentVideo = videos.find((video) => video?.id === id);
  const searchRef = useRef(null);
  const currentComments = comments.length
    ? comments.filter((comment) => comment?.video_id === id)
    : null;
  const history = useHistory();

  const pickAVideo = (): string | undefined => {
    const ids = videos.map((video) => video.id);
    return ids[Math.floor(Math.random() * ids.length)];
  };

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
  }, [searchRef, videos, currentVideo]);

  if (comments.length && !currentVideo) {
    history.push("/404");
    return null;
  }
  return (
    <>
      {currentVideo && currentComments ? (
        <>
          <div className={classes.header}>
            <div className={classes.box}>
              <img
                src={Logo}
                alt="youvid-analysis"
                className={classes.logo}
                onClick={() => history.push("/")}
              ></img>
              <SearchBar ref={searchRef}></SearchBar>
            </div>
            <Button
              startIcon={<TouchApp></TouchApp>}
              variant="contained"
              disabled={!currentVideo}
              className={classes.button}
              onClick={() => {
                history.push("/video/" + pickAVideo());
              }}
            >
              Pick a video
            </Button>
          </div>
          <Grid container className={classes.root}>
            <Grid
              item
              xs={12}
              lg={9}
              spacing={3}
              className={classes.videoSection}
            >
              <div>
                <div className={classes.row}>
                  <Typography className={classes.heading}>Channel</Typography>
                </div>
                <Grid container spacing={2}>
                  {Object.keys(ChannelOverview).map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                      <Card
                        title={item}
                        content={formatNumber(currentVideo[Mapper[item]] || 0)}
                        color={ChannelOverview[item].color}
                        endorment={ChannelOverview[item].endorment}
                      ></Card>
                    </Grid>
                  ))}
                </Grid>
              </div>

              <div>
                <div className={classes.row}>
                  <Typography className={classes.heading}>Video</Typography>
                </div>
                <Grid container spacing={3}>
                  {Object.keys(VideoOverview).map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                      <Card
                        title={item}
                        content={formatNumber(currentVideo[Mapper[item]] || 0)}
                        color={VideoOverview[item].color}
                        endorment={VideoOverview[item].endorment}
                      ></Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {loading && (
                <div className={classes.video}>
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress></CircularProgress>
                    <Typography variant="h6">Loading video...</Typography>
                  </div>
                </div>
              )}
              <div className={classes.video}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  fallback={<CircularProgress></CircularProgress>}
                  onReady={() => setLoading(false)}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                ></ReactPlayer>
              </div>
              <div>
                <div className={classes.row}>
                  <Typography className={classes.heading}>
                    Channel vs Video
                  </Typography>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <ChannelOverviewCard
                      video={currentVideo}
                    ></ChannelOverviewCard>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardDetails video={currentVideo}></CardDetails>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} lg={3} className={classes.comments}>
              <div className={classes.row}>
                <Icon className={classes.icon}>
                  <Comment fontSize="small"></Comment>
                </Icon>
                <Typography variant="h5">Comments</Typography>
              </div>
              {currentComments ? (
                <Comments comments={currentComments}></Comments>
              ) : (
                <div className={classes.loading}>
                  <CircularProgress></CircularProgress>
                  <Typography variant="h6">Loading comments...</Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader></Loader>
      )}
      ;
    </>
  );
}

export default VideoDetails;
