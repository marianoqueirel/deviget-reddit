import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import PostDescription from "./components/PostDescription";
import PostList from "./components/PostList";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

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
      <Grid
        container
        xs={11}
        md={8}
        lg={9}
        style={{ justifyContent: "center" }}
      >
        <PostDescription />
      </Grid>
    </Grid>
  );
};

export default App;
