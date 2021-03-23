export const Mapper: { [key: string]: { [key: string]: string } } = {
  video: {
    likes: "like_count",
    dislikes: "dislike_count",
    comments: "comments_rate",
    views: "view_count",
    "Skewness of likes distribution in comments": "SKEW(comments.likes)",
    "Comment rate": "comments_rate",
    "Average likes of comments": "MEAN(comments.likes)",
    "Minimum likes of comments": "MIN(comments.likes)",
    "Unique commentors": "NUM_UNIQUE(comments.username)",
    "Q scrore": "q_score",
    "Like rate": "likes_rate",
  },
  channel: {
    videos: "COUNT(videos)",
    "average views": "MEAN(videos.view_count)",
    "average likes": "MEAN(videos.like_count)",
    "average dislikes": "MEAN(videos.dislike_count)",
    "average comments": "MEAN(videos.comment_count)",
    "Channel Average skewness of likes distribution in comments":
      "MEAN(videos.SKEW(comments.likes))",
    "Average comment rate": "MEAN(videos.comments_rate)",
    "Channel Average likes of comments": "MEAN(comments.likes)",
    "Channel Minimum likes of comments": "MIN(comments.likes)",
    "Channel Average unique commentors":
      "MEAN(videos.NUM_UNIQUE(comments.username))",
    "Average Q scrore": "MEAN(videos.q_score)",
    "Average like rate": "MEAN(videos.likes_rate)",
  },
};
