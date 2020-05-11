import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PostListItem from "./PostItem";
import { animated, useTransition } from "react-spring";

const PostList = ({ posts, dismissAllPosts, onSelectPost }) => {
  const animatedPosts = useTransition(posts, (post) => post.id, {
    config: { duration: 300 },
    from: { opacity: 0, transform: "translate3d(0%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
  });

  return (
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
        {animatedPosts.map(({ item, props, key }) => (
          <Grid item xs={12}>
            <animated.div style={props} key={key}>
              <PostListItem post={item} onSelect={onSelectPost} key={item.id} />
            </animated.div>
          </Grid>
        ))}
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
};

export default PostList;
