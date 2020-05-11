import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import redditImage from "../../assets/images/reddit.png";

const PostDescription = ({ post }) => {
  const postSelected = Object.entries(post).length > 0;

  const renderPostContent = () => {
    const { author, num_comments, thumbnail, created_utc, title } = post;
    const image =
      thumbnail.substring(0, 4) === "http" ? thumbnail : redditImage;
    return (
      <Fragment>
        {author}
        {num_comments}
        <img
          style={{ width: "15rem", height: "15rem" }}
          alt={`of ${author}`}
          src={image}
        />
        {created_utc}
        {title}
      </Fragment>
    );
  };

  return (
    <Box style={{ width: "100%", padding: "2%" }}>
      {postSelected ? (
        renderPostContent()
      ) : (
        <Typography variant="h4">Post Description not yet available</Typography>
      )}
    </Box>
  );
};

export default PostDescription;
