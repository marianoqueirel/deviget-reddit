import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import PostList from "./PostList";

const LeftPanel = ({ loading }) => {
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

  return (
    <Fragment>
      <Hidden mdUp>
        <SwipeableDrawer
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ width: "300px", height: "100%" }}>
            {loading ? <h1>Loading</h1> : <PostList />}
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
          {loading ? <h1>Loading</h1> : <PostList onSelectPost={setDrawer} />}
        </Grid>
      </Hidden>
    </Fragment>
  );
};

export default LeftPanel;
