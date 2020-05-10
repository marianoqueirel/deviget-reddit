import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";

import PostListItem from "./PostListItem";

const PostList = ({ posts, loading, dismissAllPosts }) => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const renderRedditList = () => (
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
        <Grid xs={12}>
          {posts.map((post) => {
            return <PostListItem post={post} onSelect={setDrawer} />;
          })}
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

  return (
    <Fragment>
      <Hidden mdUp>
        <SwipeableDrawer
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ width: "300px", height: "100%" }}>
            {loading ? <h1>Loading</h1> : renderRedditList()}
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdUp>
        <Grid
          item
          xs={1}
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuIcon
            style={{ cursor: "pointer" }}
            onClick={() => setDrawer(true)}
          />
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid
          item
          md={4}
          lg={3}
          style={{
            height: "100%",
          }}
        >
          {loading ? <h1>Loading</h1> : renderRedditList()}
        </Grid>
      </Hidden>
    </Fragment>
  );
};

export default PostList;
