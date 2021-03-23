import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { videosContext } from "../../Provider/VideosProvider";
import moment, { Moment } from "moment";
import { makeStyles, Grid } from "@material-ui/core";
import { ChannelCharts, Chart, VideoType } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  charts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
    ["@media (max-width:700px)"]: {
      gridTemplateColumns: "1fr",
      gridGap: "0",
    },
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

const getData = (videos: VideoType[], chart: Chart) => {
  return {
    labels: [
      ...videos.map(
        (item) =>
          item["DAY(upload_date)"] +
          "/" +
          item["MONTH(upload_date)"] +
          "/" +
          item["YEAR(upload_date)"]
      ),
    ],
    datasets: [
      {
        label: chart.title,
        data: [...videos.map((item) => item[chart.metric])],
        fill: false,
        backgroundColor: chart.backgroundColor,
        borderColor: chart.borderColor,
        showLine: false,
      },
    ],
  };
};

function ScatterCharts({ currentChannel }: { currentChannel: string }) {
  const classes = useStyles();
  const [mainChart, setMainChart] = useState("SKEW(comments.likes)");
  const videos = useContext(videosContext);
  const filteredVideos = videos.filter(
    (video) => video.channel_id === currentChannel
  );
  const bigChart =
    ChannelCharts.find((chart) => chart.metric === mainChart) ||
    ChannelCharts[0];
  return (
    <>
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
          data={getData(filteredVideos, bigChart)}
          height={300}
          options={getOptions(bigChart.backgroundColor)}
        ></Line>
      </Grid>
      <Grid item xs={12} className={classes.charts}>
        {ChannelCharts.filter((chart) => chart.metric != mainChart).map(
          (chart) => (
            <div key={chart.metric} onClick={() => setMainChart(chart.metric)}>
              <Line
                data={getData(filteredVideos, chart)}
                height={200}
                options={getOptions(chart.backgroundColor)}
              ></Line>
            </div>
          )
        )}
      </Grid>
    </>
  );
}

export default ScatterCharts;
