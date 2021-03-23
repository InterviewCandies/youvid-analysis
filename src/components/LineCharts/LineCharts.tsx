import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChannelCharts, Chart } from "../../types/types";
import { readCSV } from "../../utils/readCSV";

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
        showLine: true,
      },
    ],
  };
};

function LineCharts({ data }: { data: [] }) {
  const classes = useStyles();
  const [mainChart, setMainChart] = useState("SKEW(comments.likes)");
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
        ></Line>
      </Grid>
      <Grid item xs={12} className={classes.charts}>
        {ChannelCharts.filter((chart) => chart.metric != mainChart).map(
          (chart) => (
            <div key={chart.metric} onClick={() => setMainChart(chart.metric)}>
              <Line
                data={filterData(data, chart)}
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

export default LineCharts;
