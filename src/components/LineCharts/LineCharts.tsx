import { Grid, makeStyles } from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import {ChannelCharts, Chart, VideoType} from "../../types/types";
import { readCSV } from "../../utils/readCSV";
import moment from "moment";
import {videosContext} from "../../Provider/VideosProvider";
import {groupByMonth} from "../../utils/groupByMonth";

const useStyles = makeStyles(() => ({
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

const filterData = (data: VideoType[], chart: Chart) => {
  const groupedData = groupByMonth(data, chart);

  return {
    labels: [...groupedData.map((item) => moment(item["upload_date"]).format("MM-YYYY"))],
    datasets: [
      {
        label: chart.title,
        data: [...groupedData.map((item) => item[chart.metric])],
        fill: false,
        backgroundColor: chart.backgroundColor,
        borderColor: chart.borderColor,
        showLine: true,
      },
    ],
  };
};

function LineCharts({ currentChannel }: { currentChannel: string }) {
  const classes = useStyles();
  const videos = useContext(videosContext);
  const data = videos.filter(
      (video) => video.channel_id === currentChannel
  );
  const [mainChart, setMainChart] = useState("q_score");
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
          data={filterData(data, bigChart)}
          height={300}
          options={getOptions(bigChart.backgroundColor)}
        />
      </Grid>
      <Grid item xs={12} className={classes.charts}>
        {ChannelCharts.filter((chart) => chart.metric != mainChart).map(
          (chart) => (
            <div key={chart.metric} onClick={() => setMainChart(chart.metric)}>
              <Line
                data={filterData(data, chart)}
                height={200}
                options={getOptions(chart.backgroundColor)}
              />
            </div>
          )
        )}
      </Grid>
    </>
  );
}

export default LineCharts;
