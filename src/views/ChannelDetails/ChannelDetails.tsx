import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { TouchApp } from "@material-ui/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  ChannelCharts,
  ChannelOverview,
  ChannelType,
  Chart,
} from "../../types/types";
import { readCSV } from "../../utils/readCSV";
import Logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import { channelsContext } from "../../Provider/ChannelsProvider";
import { formatNumber } from "../../utils/numberFormatHelper";
import { Mapper } from "../../utils/mapper";
import Card from "../../components/Card/Card";
import { ChannelOverviewCard } from "../VideoDetails/VideoDetails";
import NavBar from "../../components/Navbar/NavBar";
import Loader from "../../components/Loader/Loader";
import { videosContext } from "../../Provider/VideosProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#1e2328",
  },
  body: {
    color: "#fff",
    padding: "3rem",
    "& > *": {
      marginBottom: "2rem",
    },
  },
  charts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
    ["@media (max-width:700px)"]: {
      gridTemplateColumns: "1fr",
      gridGap: "0",
    },
  },
  button: {
    textTransform: "none",
    padding: "0.75rem 1rem",
    color: "#fff",
    fontWeight: 600,
    fontSize: "18px",
  },
}));

const getOptions = (color: string) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      fontColor: color || "white",
      labels: {
        fontColor: color || "white",
        boxWidth: 0,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: color || "white",
          },
          gridLines: {
            color: "#1e2328",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: color || "white",
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

const filterData = (data: [], chart: Chart) => {
  return {
    labels: [...data.map((item) => item["upload_date"])],
    datasets: [
      {
        label: chart.title,
        data: [...data.map((item) => item[chart.metric])],
        fill: false,
        backgroundColor: chart.backgroundColor,
        borderColor: chart.borderColor,
      },
    ],
  };
};

function ChannelDetails() {
  const classes = useStyles();
  const url = window.location.hash;
  const id: string = url.substring(url.lastIndexOf("/") + 1);
  const [data, setData] = useState<[]>([]);
  const [mainChart, setMainChart] = useState("SKEW(comments.likes)");
  const history = useHistory();
  const searchRef = useRef(null);
  const channels = React.useContext(channelsContext);
  const videos = React.useContext(videosContext);
  const currentChannel = channels.find((channel) => channel?.channel_id === id);
  const channelName = videos.find((video) => video.channel_id === id)?.[
    "username_channel"
  ];

  useEffect(() => {
    async function getData() {
      const parseData = (await readCSV("/video_by_month.csv")) as [];
      //@ts-ignore
      setData(parseData.filter((item) => item.channel_id === id));
      console.log("render");
    }
    getData();
  }, [id]);

  const bigChart =
    ChannelCharts.find((chart) => chart.metric === mainChart) ||
    ChannelCharts[0];

  const pickAChannel = (): string => {
    const ids = channels.map((channel) => channel.channel_id);
    let channelId = null;
    while (!channelId) channelId = ids[Math.floor(Math.random() * ids.length)];
    return channelId;
  };

  useEffect(() => {
    if (searchRef.current)
      //@ts-ignore
      searchRef.current.onkeyup = (e) => {
        //@ts-ignore
        if (e.key === "Enter" || e.keyCode === 13) {
          //@ts-ignore
          const searchKey = e.target.value;
          const channel = channels.find(
            (channel) => channel.channel_id === searchKey.trim()
          );

          if (channel?.channel_id)
            history.push("/channel/" + channel.channel_id);
          else {
            alert("Channel does not exsit");
            //@ts-ignore
            e.target.value = "";
          }
        }
      };
  }, [searchRef, channels, currentChannel]);

  return (
    <div className={classes.root}>
      <NavBar ref={searchRef}></NavBar>
      {data && currentChannel ? (
        <Grid container className={classes.body}>
          <Grid
            item
            xs={12}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography variant="h4">{channelName}</Typography>
            <Button
              startIcon={<TouchApp></TouchApp>}
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                history.push("/channel/" + pickAChannel());
              }}
            >
              Pick a channel
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {Object.keys(ChannelOverview).map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                  <Card
                    theme="dark"
                    title={item}
                    content={formatNumber(
                      currentChannel[Mapper["channel"][item]] || 0
                    )}
                    color={ChannelOverview[item].color}
                    endorment={ChannelOverview[item].endorment}
                  ></Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "#3b3f46",
              padding: "0.75rem",
              borderRadius: "10px",
            }}
          >
            <Line
              data={filterData(data, bigChart)}
              height={300}
              options={getOptions(bigChart.backgroundColor)}
            ></Line>
          </Grid>
          <Grid item xs={12} className={classes.charts}>
            {ChannelCharts.filter((chart) => chart.metric != mainChart).map(
              (chart) => (
                <div
                  key={chart.metric}
                  onClick={() => setMainChart(chart.metric)}
                >
                  <Line
                    data={filterData(data, chart)}
                    height={200}
                    options={getOptions(chart.backgroundColor)}
                  ></Line>
                </div>
              )
            )}
          </Grid>
        </Grid>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default ChannelDetails;
