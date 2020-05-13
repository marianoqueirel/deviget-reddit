import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import LeftPanelContent from "./LeftPanelContent";

const LeftPanel = () => {
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
            <LeftPanelContent onSelectPost={setDrawer} />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdUp>
        <Grid
          item
          xs={2}
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
          <LeftPanelContent onSelectPost={setDrawer} />
        </Grid>
      </Hidden>
    </Fragment>
  );
};

export default LeftPanel;
