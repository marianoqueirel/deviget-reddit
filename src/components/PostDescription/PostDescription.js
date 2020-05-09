import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const PostDescription = ({ post }) => {
  const {
    author,
    id,
    num_comments,
    thumbnail,
    created_utc,
    title,
    read,
  } = post;

  return (
    <Grid
      container
      sm={12}
      md={8}
      lg={9}
      style={{ backgroundColor: "red", justifyContent: "center" }}
    >
      <Typography variant="h4">Post Description</Typography>
    </Grid>
  );
};

export default PostDescription;
