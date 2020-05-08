import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
});

const App = () => {
  const classes = useStyles();
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
        <Grid xs={12}>Post List</Grid>
      </div>
      <div style={{ height: "7%", textAlign: "center" }}>Footer</div>
    </Fragment>
  );

  return (
    <Grid container className={classes.container}>
      <Hidden mdUp>
        <SwipeableDrawer
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ width: "300px", height: "100%" }}>
            {renderRedditList()}
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
          {renderRedditList()}
        </Grid>
      </Hidden>
      <Grid
        container
        sm={12}
        md={8}
        lg={9}
        style={{ backgroundColor: "red", justifyContent: "center" }}
      >
        <Hidden mdUp>
          <Grid
            container
            xs={1}
            alignItems="start"
            justify="center"
            style={{ marginTop: "1rem" }}
          >
            <MenuIcon fontSize="large" onClick={() => setDrawer(true)} />
          </Grid>
        </Hidden>
        <Grid container xs={11} md={12}>
          <Typography variant="h2">Post Content</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
