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

export interface ChannelType {
  [key: string]: string | undefined;
}

export const VideoAvancedDetails = [
  "Skewness of likes distribution in comments",
  "Comment rate",
  "Average likes of comments",
  "Minimum likes of comments",
  "Unique commentors",
  "Q scrore",
  "Like rate",
];

export const ChannelAvancedDetails = [
  "Channel Average skewness of likes distribution in comments",
  "Average comment rate",
  "Channel Average likes of comments",
  "Channel Minimum likes of comments",
  "Channel Average unique commentors",
  "Average Q scrore",
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
    metric: "SKEW(comments.likes)",
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgba(255, 99, 132, 0.2)",
    title: "Trend of skewness of likes distribution in comments",
  },
  {
    metric: "q_score",
    backgroundColor: "rgb(23, 165, 137 )",
    borderColor: "rgba(23, 165, 137, 0.2)",
    title: "Trend of q score",
  },
  {
    metric: "likes_rate",
    backgroundColor: "rgb(165, 105, 189 )",
    borderColor: "rgba(165, 105, 189 , 0.2)",
    title: "Trend of  like rate",
  },
  {
    metric: "comments_rate",
    backgroundColor: "rgb(52, 152, 219 )",
    borderColor: "rgba(52, 152, 219 , 0.2)",
    title: "Trend of comment rate",
  },
  {
    metric: "NUM_UNIQUE(comments.username)",
    backgroundColor: "rgb(230, 126, 34)",
    borderColor: "rgba(230, 126, 34 , 0.2)",
    title: "Trend of unique commenters",
  },
];
