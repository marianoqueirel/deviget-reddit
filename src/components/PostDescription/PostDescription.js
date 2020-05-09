import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const PostDescription = ({ post }) => {
  const postSelected = Object.entries(post).length;

  return (
    <Grid
      container
      sm={12}
      md={8}
      lg={9}
      style={{ backgroundColor: "red", justifyContent: "center" }}
    >
      {postSelected ? (
        <Typography variant="h4">Post Description Selected</Typography>
      ) : (
        <Typography variant="h4">Post Description not yer available</Typography>
      )}
    </Grid>
  );
};

export default PostDescription;
