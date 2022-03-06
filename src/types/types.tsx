import {
  Visibility,
  Comment,
  ThumbDown,
  ThumbUp,
  YouTube,
} from "@material-ui/icons";
import React from "react";

interface Endorment {
  color: string;
  endorment: JSX.Element;
}

export type OverviewVideoMetrics =
  | "likes"
  | "dislikes"
  | "comments"
  | "views"
  | string;

export const VideoOverview: {
  [key: string]: Endorment;
} = {
  views: {
    color: "#f5a302",
    endorment: <Visibility></Visibility>,
  },
  likes: {
    color: "#4299e1",
    endorment: <ThumbUp></ThumbUp>,
  },
  dislikes: {
    color: "#f56565",
    endorment: <ThumbDown></ThumbDown>,
  },
  comments: {
    color: "#ed64a6",
    endorment: <Comment></Comment>,
  },
};

export const ChannelOverview: {
  [key: string]: Endorment;
} = {
  "average views": {
    color: "#f5a302",
    endorment: <Visibility></Visibility>,
  },
  "average likes": {
    color: "#4299e1",
    endorment: <ThumbUp></ThumbUp>,
  },
  "average dislikes": {
    color: "#f56565",
    endorment: <ThumbDown></ThumbDown>,
  },
  "average comments": {
    color: "#ed64a6",
    endorment: <Comment></Comment>,
  },
};

export interface VideoType {
  [key: string]: string | undefined;
}

export interface CommentType {
  username: string;
  likes: string;
  comment: string;
  video_id?: string;
}

export interface CommentStatsType {
  [key: string]: string | undefined;
}

export interface CategoryType {
  [key: string]: string | undefined;
}

export interface ChannelType {
  [key: string]: string | undefined;
}

export interface ResultsType {
  [key: string]: string | undefined;
}


export const VideoAvancedDetails = [
  "Comment rate",
  "Dislike rate",
  "Q score",
  "Like rate",
];

export const ChannelAvancedDetails = [
  "Average comment rate",
  "Average dislike rate",
  "Average Q score",
  "Average like rate",
];

export interface Chart {
  metric: string;
  backgroundColor: string;
  borderColor: string;
  title: string;
}

export const ChannelCharts: Chart[] = [
  {
    metric: "q_score",
    backgroundColor: "rgb(23, 165, 137 )",
    borderColor: "rgba(23, 165, 137, 0.2)",
    title: "Trend of q score",
  },
  {
    metric: "like_per_view",
    backgroundColor: "rgb(165, 105, 189 )",
    borderColor: "rgba(165, 105, 189 , 0.2)",
    title: "Trend of  like rate",
  },
  {
    metric: "comment_per_view",
    backgroundColor: "rgb(52, 152, 219 )",
    borderColor: "rgba(52, 152, 219 , 0.2)",
    title: "Trend of comment rate",
  },
  {
    metric: "dislike_per_view",
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgba(255, 99, 132, 0.2)",
    title: "Trend of dislike rate",
  },
];
