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
import { CommentType } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3rem",
  },
  box: {
    width: "300px",
  },
  title: {
    display: "flex",
    width: "350px",
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
        label: "# of Votes",
        data: [...data],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(23, 165, 137, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(23, 165, 137, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const filterComments = (
  comments: CommentType[],
  condition: (comment: CommentType) => boolean
) => {
  return comments.filter(condition).length;
};

function CommentsDetails({
  open,
  handleClose,
  comments,
}: {
  open: boolean;
  handleClose: () => void;
  comments: CommentType[];
}) {
  const classes = useStyles();

  const mediumComments = filterComments(
    comments,
    (comment) =>
      Number(comment.likes || 0) > 10 && Number(comment.likes || 0) <= 500
  );
  const highComments = filterComments(
    comments,
    (comment) => Number(comment.likes || 0) > 500
  );

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
                [
                  "Comments with 1 to 10 likes",
                  "Comments with 10 to 500 likes",
                  "Comments with above 500 likes",
                ],
                [comments.length - highComments, mediumComments, highComments]
              )}
              width={300}
              height={300}
              options={{
                maintainAspectRatio: false,
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 20,
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
