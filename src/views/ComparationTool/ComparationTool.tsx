//@ts-nocheck

import {
  makeStyles,
  Grid,
  TextField,
  CircularProgress,
  Chip,
  Avatar,
  Typography,
  Button,
  withStyles,
  Tabs,
  Tab,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { videosContext } from "../../Provider/VideosProvider";
import { ChannelType, CommentType, VideoType } from "../../types/types";
import ReactPlayer from "react-player";
import { Mapper } from "../../utils/mapper";
import Comments from "../../components/Comments/Comments";
import { commentsContext } from "../../Provider/CommentsProvider";
import { PlayArrow } from "@material-ui/icons";
import { channelsContext } from "../../Provider/ChannelsProvider";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { handleDate } from "../../utils/handleDate";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#1e2328",
  },
  video: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  rows: {
    "& > *": {
      marginBottom: "2rem",
    },
  },
  input: {
    backgroundColor: "#3b3f46",
    color: "#fff",
  },
  label: {
    color: "#fff",
  },
  paper: {
    color: "#fff",
    backgroundColor: "#3b3f46",
  },
  inputRoot: {
    color: "#fff",
  },
  popupIndicator: {
    color: "#fff",
  },
  clearIndicator: {
    color: "#fff",
  },
  button: {
    color: "#fff",
  },
  loading: {
    dipsplay: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    width: "100%",
  },
}));

const useChannelStyles = makeStyles(() => ({
  root: {
    padding: "2rem",
    "& > *": {
      marginBottom: "2rem",
    },
  },
  rows: {
    display: "flex",
    color: "#fff",
    alignItems: " center",
    gap: "2rem",
  },
}));

function ComboBox(props: { options: any; getOptionLabel: any; onChange: any }) {
  const classes = useStyles();

  return (
    <Autocomplete
      color={props.color}
      classes={{
        paper: classes.paper,
        inputRoot: classes.inputRoot,
        clearIndicator: classes.clearIndicator,
        popupIndicator: classes.popupIndicator,
      }}
      {...props}
      style={{ width: 300, color: "#fff" }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.input}
          color={props.color}
          variant="outlined"
          InputLabelProps={{ className: classes.label }}
        />
      )}
    />
  );
}

const getOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      fontColor: "white",
      labels: {
        fontColor: "white",
        boxWidth: 0,
      },
    },
    tooltips: {
      callbacks: {
        title: (toolTipItem, data) => {
          let title = moment(toolTipItem[0].xLabel).format("DD/MM/YYYY"); // uses the x value of this point as the title
          return title;
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white",
            callback: function (value) {
              return moment(value).format("DD/MM/YYYY");
            },
          },
          gridLines: {
            color: "#1e2328",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "white",
            beginAtZero: true,
          },
          gridLines: {
            color: "#1e2328",
          },
        },
      ],
    },
  };
};

const getLabels = (data: [], type: "line" | "scatter") => {
  switch (type) {
    case "scatter":
      const arr = [
        ...new Set([
          ...data.map((item) =>
            new Date(
              handleDate(item["MONTH(upload_date)"]) +
                "/" +
                handleDate(item["DAY(upload_date)"]) +
                "/" +
                handleDate(item["YEAR(upload_date)"])
            ).getTime()
          ),
        ]),
      ];
      arr.sort(function (a, b) {
        return a - b;
      });
      return arr;

    case "line":
      return [...data.map((item) => item["upload_date"])];

    default:
      return [];
  }
};

const getData = (
  data: [],
  title: string,
  metric: string,
  color: "string",
  type: "line" | "scatter"
) => {
  switch (type) {
    case "line":
      return {
        label: title,
        data: [...data.map((item) => item[metric])],
        fill: false,
        backgroundColor: color,
        borderColor: color,
        showLine: true,
      };
    case "scatter":
      return {
        label: title,
        data: [
          ...data.map((item) => {
            return {
              x: new Date(
                handleDate(item["MONTH(upload_date)"]) +
                  "/" +
                  handleDate(item["DAY(upload_date)"]) +
                  "/" +
                  handleDate(item["YEAR(upload_date)"])
              ).getTime(),
              y: item[metric],
            };
          }),
        ],
        fill: false,
        backgroundColor: color,
        borderColor: color,
        showLine: false,
      };

    default:
      return {};
  }
};

const Chart = ({
  dataset,
  type,
  metric,
}: {
  dataset: [];
  type: "line | scatter";
  metric: string;
}) => {
  const getDataset = () => {
    return dataset.map((item) =>
      item ? getData(item.data, item.title, metric, item.color, type) : {}
    );
  };
  const combineLabels = () => {
    let labels = [];
    dataset.forEach((item) => (labels = labels.concat(item?.data)));
    return labels;
  };
  return (
    <Grid
      item
      xs={12}
      style={{
        backgroundColor: "#3b3f46",
        padding: "0.75rem",
        borderRadius: "10px",
        marginBottom: "2rem",
      }}
    >
      <Line
        data={{
          labels: getLabels(combineLabels(), type),
          datasets: getDataset(),
        }}
        height={350}
        options={getOptions()}
      ></Line>
    </Grid>
  );
};

function ChannelInfo() {
  const classes = useChannelStyles();
  const channels: ChannelType[] = useContext(channelsContext);
  const videos: VideoType[] = useContext(videosContext);
  const [channel1, setChannel1] = useState<ChannelType | null>(null);
  const [channel2, setChannel2] = useState<ChannelType | null>(null);
  const [scatterDataset, setScatterDataset] = useState<[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setScatterDataset((prevState) => {
      if (!channel1) return prevState;
      const newData = [...prevState];
      newData[0] = {
        title: channel1.channel_id,
        color: theme.palette.primary.main,
        data: videos.filter((video) => video.channel_id == channel1.channel_id),
      };
      return newData;
    });
  }, [channel1]);

  useEffect(() => {
    setScatterDataset((prevState) => {
      if (!channel2) return prevState;
      const newData = [...prevState];
      newData[1] = {
        title: channel2.channel_id,
        color: theme.palette.secondary.main,
        data: videos.filter((video) => video.channel_id == channel2.channel_id),
      };
      return newData;
    });
  }, [channel2]);
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.rows}>
          <Typography>Channel 1: </Typography>
          <ComboBox
            onChange={(e, value) => setChannel1(value)}
            options={channels}
            color="primary"
            getOptionLabel={(option) => option.channel_id}
          ></ComboBox>
        </Grid>
        <Grid item xs={12} className={classes.rows}>
          <Typography>Channel 2: </Typography>
          <ComboBox
            options={channels}
            onChange={(e, value) => setChannel2(value)}
            color="secondary"
            getOptionLabel={(option) => option.channel_id}
          ></ComboBox>
        </Grid>
        <Grid item xs={12}>
          <Chart
            dataset={scatterDataset}
            type="scatter"
            metric="q_score"
          ></Chart>
        </Grid>
      </Grid>
    </>
  );
}

function VideoInfo({ color }: { color: "primary" | "secondary" }) {
  const classes = useStyles();
  const videos = useContext(videosContext);
  const comments: CommentType[] = useContext(commentsContext);

  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);
  const [currentComments, setCurrentComments] = useState<CommentType[] | null>(
    null
  );

  useEffect(() => {
    setCurrentComments(
      comments.length
        ? comments.filter((comment) => comment?.video_id === currentVideo?.id)
        : null
    );
  }, [currentVideo]);

  return (
    <div style={{ padding: "2rem" }} className={classes.rows}>
      <ComboBox
        color={color}
        options={videos}
        getOptionLabel={(option) => option.id as string}
        onChange={(event, value) => setCurrentVideo(value)}
      ></ComboBox>
      {currentVideo && (
        <div className={classes.rows}>
          <div className={classes.video}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${currentVideo.id}`}
              fallback={<CircularProgress></CircularProgress>}
              playing
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            ></ReactPlayer>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {Object.keys(Mapper["video"]).map((metric, i) => {
              return (
                <Chip
                  key={metric}
                  color={color}
                  style={{
                    fontSize: "1.25rem",
                    padding: "1.25rem",
                    wordBreak: "break-all",
                  }}
                  label={(
                    metric +
                    " : " +
                    (currentVideo[Mapper["video"][metric]]?.trim().length
                      ? currentVideo[Mapper["video"][metric]]
                      : "0")
                  ).toLocaleLowerCase()}
                ></Chip>
              );
            })}
          </div>
          <div
            style={{
              backgroundColor: "#3b3f46",
              height: "350px",
              overflowX: "hidden",
              overflowY: "auto",
              padding: "1.5rem",
              boxSizing: "border-box",
              color: "#fff",
              borderRadius: "16px",
              width: "100%",
            }}
          >
            {currentComments ? (
              <Comments comments={currentComments}></Comments>
            ) : (
              <div className={classes.loading}>
                <CircularProgress color="secondary"></CircularProgress>
                <Typography variant="h6">Loading comments...</Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ComparationTool() {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <Grid container>
        <Grid item xs={12}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="channel" />
            <StyledTab label="video" />
          </StyledTabs>
        </Grid>
        {value ? (
          <>
            <Grid item xs={6}>
              <VideoInfo color="primary"></VideoInfo>
            </Grid>
            <Grid item xs={6}>
              <VideoInfo color="secondary"></VideoInfo>
            </Grid>
          </>
        ) : (
          <Grid ite xs={12}>
            <ChannelInfo></ChannelInfo>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default ComparationTool;
