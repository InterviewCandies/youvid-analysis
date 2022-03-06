export const Mapper: { [key: string]: { [key: string]: string } } = {
  video: {
    likes: "like_count",
    dislikes: "dislike_count",
    comments: "comment_count",
    views: "view_count",
    "Comment rate": "comment_per_view",
    "Q score": "q_score",
    "Like rate": "like_per_view",
    "Dislike rate": "dislike_per_view"
  },
  channel: {
    videos: "COUNT(videos)",
    "average views": "median_view_count",
    "average likes": "median_like_count",
    "average dislikes": "median_dislike_count",
    "average comments": "median_comment_count",
    "Average comment rate": "median_comment_per_view",
    "Average dislike rate": "median_dislike_per_view",
    "Average Q score": "median_q_score",
    "Average like rate": "median_like_per_view",
  },
};
