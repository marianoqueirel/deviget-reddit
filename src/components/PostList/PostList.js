import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const PostList = ({ posts, loading }) => {
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
      <div style={{ height: "7%", textAlign: "center" }}>Header</div>
      <div
        style={{ height: "84%", backgroundColor: "blue", overflowY: "auto" }}
      >
        <Grid xs={12}>
          {posts.map((post) => {
            return <h1>Post</h1>;
          })}
        </Grid>
      </div>
      <div style={{ height: "7%", textAlign: "center" }}>Footer</div>
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
      <Hidden smDown>
        <Grid
          md={4}
          lg={3}
          style={{
            backgroundColor: "green",
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
