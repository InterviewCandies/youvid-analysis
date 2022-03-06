import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { TouchApp } from "@material-ui/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  ChannelCharts,
  ChannelOverview,
  ChannelType,
  Chart, VideoType,
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
  const channels = React.useContext(channelsContext);
  const currentChannel = channels.find((channel) => channel?.channel_id === id);


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
      <NavBar ref={searchRef}/>
      { currentChannel ? (
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
            <Typography variant="h4">{currentChannel.channel_name + ' ('  + currentChannel.channel_category + ')'}</Typography>
            <Button
              startIcon={<TouchApp/>}
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
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Typography variant="h5">Group by month</Typography>
          <Grid item xs={12}>
            <LineCharts currentChannel={currentChannel.channel_id as string}/>
          </Grid>
          <Typography variant="h5">Per video</Typography>
          <Grid item xs={12}>
            <ScatterCharts
              currentChannel={currentChannel.channel_id as string}/>
          </Grid>
        </Grid>
      ) : (
        <Loader/>
      )}
    </div>
  );
}

export default ChannelDetails;
