import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import PostListItem from "./PostItem";

const PostList = ({ posts, dismissAllPosts, onSelectPost }) => (
  <Fragment>
    <div
      style={{
        height: "7%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography align="center">Reddit</Typography>
    </div>
    <div style={{ height: "86%", overflowY: "auto" }}>
      <Grid item xs={12}>
        {posts.map((post) => (
          <PostListItem post={post} onSelect={onSelectPost} key={post.id} />
        ))}
      </Grid>
    </div>
    <div
      style={{
        height: "7%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        color="secondary"
        startIcon={<DeleteIcon />}
        children={"Dismiss All"}
        onClick={dismissAllPosts}
      />
    </div>
  </Fragment>
);

export default PostList;
