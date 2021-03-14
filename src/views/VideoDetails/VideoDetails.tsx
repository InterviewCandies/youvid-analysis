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
  OpenInNew,
  Search,
  TouchApp,
  YouTube,
} from "@material-ui/icons";
import {
  ChannelAvancedDetails,
  ChannelOverview,
  ChannelType,
  CommentStatsType,
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
import { Link, useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Logo from "../../assets/img/logo.png";
import { channelsContext } from "../../Provider/ChannelsProvider";
import NavBar from "../../components/Navbar/NavBar";
import CommentsDetails from "../../components/CommentsDetails/CommentsDetails";
import { commentsStatsContext } from "../../Provider/CommentStatsProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#1e2328",
    color: "#fff",
  },
  videoSection: {
    backgroundColor: "#1e2328",
    color: "#fff",
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
  link: {
    fontWeight: 600,
    fontSize: theme.spacing(4),
    color: theme.palette.secondary.main,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
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
    marginTop: "2rem",
    backgroundColor: "#3b3f46",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
    borderRadius: "16px",
    padding: theme.spacing(3),
    overflow: "auto",
  },
  button: {
    textTransform: "none",
    padding: "0.75rem 1rem",
    fontWeight: 600,
    fontSize: "18px",
  },
}));

interface Props {
  gradient: string;
}

const useCardStyles = makeStyles<Theme, Props>((theme) => ({
  card: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2328",
    width: "9rem",
    height: "9rem",
    borderRadius: "50%",
  },
  border: {
    width: "10rem",
    height: "10rem",
    background: (props) => props.gradient,
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  block: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "18rem",
    ["@media (max-width:500px)"]: {
      width: "10rem",
    },
  },
  subtitle: {
    fontSize: "1.25rem",
    textAlign: "center",
    ["@media (max-width:500px)"]: {
      fontSize: "1rem",
    },
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    ["@media (max-width:500px)"]: {
      fontSize: "1rem",
    },
  },
}));

function CardDetails({ video }: { video: VideoType }) {
  const classes = useCardStyles({
    gradient: "linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)",
  });

  return (
    <Grid container className={classes.card}>
      <Typography variant="h5" style={{ fontWeight: 600 }}>
        Video
      </Typography>
      <div className={classes.row}>
        {VideoAvancedDetails.map((item) => (
          <div key={item} className={classes.block}>
            <div className={classes.border}>
              <div className={classes.circle}>
                <Typography variant="h4" className={classes.heading}>
                  {formatNumber(video[Mapper["video"][item]] || 0)}
                </Typography>
              </div>
            </div>
            <Typography className={classes.subtitle}>{item}</Typography>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export function ChannelOverviewCard({ channel }: { channel: ChannelType }) {
  const classes = useCardStyles({
    gradient: "linear-gradient(to right, #f953c6, #b91d73);",
  });

  return (
    <Grid container className={classes.card}>
      <div className={classes.cardRow} style={{ justifyContent: "center" }}>
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          Channel
        </Typography>
      </div>
      <div className={classes.row}>
        {ChannelAvancedDetails.map((item) => (
          <div key={item} className={classes.block}>
            <div className={classes.border}>
              <div className={classes.circle}>
                <Typography variant="h4" className={classes.heading}>
                  {formatNumber(channel[Mapper["channel"][item]] || 0)}
                </Typography>
              </div>
            </div>
            <Typography className={classes.subtitle}>
              {item.replace("Channel ", "")}
            </Typography>
          </div>
        ))}
      </div>
    </Grid>
  );
}

function VideoDetails() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<Boolean>(true);
  const videos: VideoType[] = React.useContext(videosContext);
  const comments: CommentType[] = React.useContext(commentsContext);
  const channels: ChannelType[] = React.useContext(channelsContext);
  const commentStats: CommentStatsType[] = React.useContext(
    commentsStatsContext
  );

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const url = window.location.hash;
  const id: string = url.substring(url.lastIndexOf("/") + 1);
  const currentVideo = videos.find((video) => video?.id === id);
  const currentChannel = channels.find(
    (channel) => channel?.channel_id === currentVideo?.channel_id
  );
  const currentCommentStats = commentStats.find((item) => item.video_id === id);

  const searchRef = useRef(null);
  const currentComments = comments.length
    ? comments.filter((comment) => comment?.video_id === id)
    : null;
  const history = useHistory();

  const pickAVideo = (): string | undefined => {
    const ids = videos.map((video) => video.id);
    let selectedId = null;
    while (!selectedId)
      selectedId = ids[Math.floor(Math.random() * ids.length)];
    return selectedId;
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
      {currentVideo && currentChannel ? (
        <>
          <NavBar theme="light" ref={searchRef}></NavBar>

          <Grid container className={classes.root}>
            <Grid
              item
              xs={12}
              lg={9}
              spacing={3}
              className={classes.videoSection}
            >
              <Grid
                item
                xs={12}
                style={{ justifyContent: "flex-end", display: "flex" }}
              >
                <Button
                  color="secondary"
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
              </Grid>
              <div>
                <div className={classes.row}>
                  <Typography className={classes.heading}>Channel</Typography>
                  <Link
                    to={"/channel/" + currentChannel.channel_id}
                    target="_blank"
                    className={classes.link}
                  >
                    {currentVideo.username_channel}
                    <Icon color="secondary">
                      <OpenInNew></OpenInNew>
                    </Icon>
                  </Link>
                </div>
                <Grid container spacing={2}>
                  {Object.keys(ChannelOverview).map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                      <Card
                        title={item}
                        theme="dark"
                        content={formatNumber(
                          currentChannel[Mapper["channel"][item]] || 0
                        )}
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
                        theme="dark"
                        title={item}
                        content={formatNumber(
                          currentVideo[Mapper["video"][item]] || 0
                        )}
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
                  playing
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
                  <Grid item xs={6}>
                    <ChannelOverviewCard
                      channel={currentChannel}
                    ></ChannelOverviewCard>
                  </Grid>
                  <Grid item xs={6}>
                    <CardDetails video={currentVideo}></CardDetails>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} lg={3} className={classes.comments}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Icon className={classes.icon}>
                    <Comment fontSize="small"></Comment>
                  </Icon>
                  <Typography variant="h5">Comments</Typography>
                </div>

                <Button
                  onClick={() => setOpenModal(true)}
                  color="secondary"
                  style={{ textTransform: "none" }}
                >
                  See more
                </Button>
              </div>

              {currentCommentStats && (
                <CommentsDetails
                  open={openModal}
                  handleClose={() => setOpenModal(false)}
                  commentStats={currentCommentStats}
                ></CommentsDetails>
              )}
              {currentComments ? (
                <Comments comments={currentComments}></Comments>
              ) : (
                <div className={classes.loading}>
                  <CircularProgress color="secondary"></CircularProgress>
                  <Typography variant="h6">Loading comments...</Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default VideoDetails;
function commentStatsContext(commentStatsContext: any): CommentStatsType[] {
  throw new Error("Function not implemented.");
}
