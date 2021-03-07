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
  videos: {
    color: "red",
    endorment: <YouTube></YouTube>,
  },
  "minimum views": {
    color: "#f5a302",
    endorment: <Visibility></Visibility>,
  },
  "minimum likes": {
    color: "#4299e1",
    endorment: <ThumbUp></ThumbUp>,
  },
  "minimum dislikes": {
    color: "#f56565",
    endorment: <ThumbDown></ThumbDown>,
  },
  "minimum comments": {
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

export const VideoAvancedDetails = [
  "Skewness of likes distribution in comments",
  "Comments per views",
  "Average likes of comments",
  "Minimum likes of comments",
  "Unique commentors",
  "Q scrore",
  "Likes per views",
];

export const ChannelAvancedDetails = [
  "Channel Skewness of likes distribution in comments",
  "Average comments per views",
  "Channel Average likes of comments",
  "Channel Minimum likes of comments",
  "Channel Unique commentors",
  "Average Q scrore",
  "Average Likes per views",
];
