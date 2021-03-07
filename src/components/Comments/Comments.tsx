import { Grid, Icon, makeStyles, Typography } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import React from "react";
import { CommentType } from "../../types/types";
import { formatNumber } from "../../utils/numberFormatHelper";
import NoComment from "../../assets/img/no_comments.png";

const useStyles = makeStyles((theme) => ({
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  image: {
    width: "100px",
    objectFit: "contain",
  },
  likes: {
    display: "flex",
    color: "#4399e1",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  content: {
    borderRadius: "10px",
    border: "1px solid #cecece",
    padding: theme.spacing(2),
  },
}));

const Comment = ({ username, likes, comment }: CommentType) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.right}>
        <Typography className={classes.title}>
          <strong>{username}</strong> said
        </Typography>
      </div>
      <div className={classes.content}>
        {comment}
        <div className={classes.likes}>
          <ThumbUp
            fontSize="small"
            style={{ marginRight: "0.25rem" }}
          ></ThumbUp>
          <Typography>{formatNumber(likes || 0)}</Typography>
        </div>
      </div>
    </div>
  );
};

function Comments({ comments }: { comments: CommentType[] }) {
  const classes = useStyles();

  return (
    <>
      {comments.length ? (
        <Grid container spacing={3}>
          {comments.map((comment) => (
            <Grid item xs={12}>
              <Comment {...comment}></Comment>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={NoComment} className={classes.image}></img>
          <Typography variant="h5">No comments</Typography>
        </div>
      )}
    </>
  );
}

export default Comments;
