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
import ScatterCharts from "../../components/ScatterCharts/ScatterCharts";
import LineCharts from "../../components/LineCharts/LineCharts";

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
  button: {
    textTransform: "none",
    padding: "0.75rem 1rem",
    color: "#fff",
    fontWeight: 600,
    fontSize: "18px",
  },
}));

function ChannelDetails() {
  const classes = useStyles();
  const url = window.location.hash;
  const id: string = url.substring(url.lastIndexOf("/") + 1);
  const history = useHistory();
  const searchRef = useRef(null);
  const [dataForLineCharts, setDataForLineCharts] = useState<[]>([]);
  const channels = React.useContext(channelsContext);
  const videos = React.useContext(videosContext);
  const currentChannel = channels.find((channel) => channel?.channel_id === id);
  const channelName = videos.find((video) => video.channel_id === id)?.[
    "username_channel"
  ];

  const pickAChannel = (): string => {
    const ids = channels.map((channel) => channel.channel_id);
    let channelId = null;
    while (!channelId) channelId = ids[Math.floor(Math.random() * ids.length)];
    return channelId;
  };

  useEffect(() => {
    async function getData() {
      const parseData = (await readCSV("/video_by_month.csv")) as [];
      //@ts-ignore
      setDataForLineCharts(parseData.filter((item) => item.channel_id === id));
      console.log("render");
    }
    getData();
  }, [id]);

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
      {dataForLineCharts && currentChannel ? (
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
          <Typography variant="h5">Group by month</Typography>
          <Grid item xs={12}>
            <LineCharts data={dataForLineCharts}></LineCharts>
          </Grid>
          <Typography variant="h5">Per video</Typography>
          <Grid item xs={12}>
            <ScatterCharts
              currentChannel={currentChannel.channel_id as string}
            ></ScatterCharts>
          </Grid>
        </Grid>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default ChannelDetails;
