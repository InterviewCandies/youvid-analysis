import {
  Grid,
  Dialog,
  makeStyles,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Icon,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { commentsStatsContext } from "../../Provider/CommentStatsProvider";
import { CommentStatsType, CommentType } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3rem",
  },
  box: {
    width: "500px",
    ["@media (max-width:520px)"]: {
      width: "300px",
    },
  },
  title: {
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "#fff",
  },
}));

const getData = (labels: string[], data: number[]) => {
  return {
    labels: [...labels],
    datasets: [
      {
        data: [...data],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(23, 165, 137, 0.2)",
          "rgba(165, 105, 189 , 0.2)",
          "rgba(52, 152, 219 , 0.2)",
          "rgba(230, 126, 34 , 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(23, 165, 137, 1)",
          "rgba(165, 105, 189 , 1)",
          "rgba(52, 152, 219 , 1)",
          "rgba(230, 126, 34 , 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

function CommentsDetails({
  open,
  handleClose,
  commentStats,
}: {
  open: boolean;
  handleClose: () => void;
  commentStats: CommentStatsType;
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: "#3b3f46",
          color: "#fff",
        },
      }}
    >
      <div className={classes.title}>
        <Typography variant="h6">Likes in comments</Typography>
        <IconButton onClick={handleClose}>
          <Icon className={classes.icon}>
            <Close></Close>
          </Icon>
        </IconButton>
      </div>
      <DialogContent className={classes.root}>
        <Grid container spacing={10}>
          <Grid item xs={12} className={classes.box}>
            <Pie
              data={getData(
                Object.keys(commentStats).slice(2),
                Object.values(commentStats)
                  .map((item) => Number(item || "0"))
                  .slice(2)
              )}
              width={400}
              height={400}
              options={{
                maintainAspectRatio: false,
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 20,
                    fontColor: "#fff",
                  },
                },
                //Thanks to: https://stackoverflow.com/a/37260662/14480038
                tooltips: {
                  callbacks: {
                    //@ts-ignore
                    label: function (tooltipItem, data) {
                      //get the concerned dataset
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      //calculate the total of this data set
                      var total = dataset.data.reduce(function (
                        previousValue: number,
                        currentValue: number,
                        currentIndex: number,
                        array: []
                      ) {
                        return previousValue + currentValue;
                      });
                      //get the current items value
                      var currentValue = dataset.data[tooltipItem.index];
                      //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                      var percentage = Math.floor(
                        (currentValue / total) * 100 + 0.5
                      );

                      return percentage + "%";
                    },
                  },
                },
              }}
            ></Pie>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CommentsDetails;
