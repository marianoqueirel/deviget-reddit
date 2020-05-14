import React from "react";
import Grid from "@material-ui/core/Grid";
import PostDescription from "./components/PostDescription";
import LeftPanel from "./components/LeftPanel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <LeftPanel />
      <Grid item xs={8} md={8} lg={9} style={{ justifyContent: "center" }}>
        <PostDescription />
      </Grid>
    </Grid>
  );
};

export default App;
