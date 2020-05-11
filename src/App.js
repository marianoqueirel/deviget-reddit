import React from "react";
import Grid from "@material-ui/core/Grid";
import PostDescription from "./components/PostDescription";
import PostList from "./components/PostList";
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
      <PostList />
      <Grid item xs={11} md={8} lg={9} style={{ justifyContent: "center" }}>
        <PostDescription />
      </Grid>
    </Grid>
  );
};

export default App;
