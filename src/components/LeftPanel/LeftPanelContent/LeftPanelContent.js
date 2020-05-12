import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PostList from "./PostList";

const LeftPanelContent = ({
  posts,
  loading,
  dismissAllPosts,
  onSelectPost,
  showUndoDismissAllPosts,
  undoDismissAllPosts,
}) => {
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
      {loading ? (
        <div>Loading</div>
      ) : posts.length < 1 && showUndoDismissAllPosts ? (
        <Button
          color="secondary"
          children={"Undo"}
          onClick={undoDismissAllPosts}
        />
      ) : (
        <Fragment>
          <div style={{ height: "86%", overflowY: "auto" }}>
            <PostList posts={posts} onSelectPost={onSelectPost} />
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
              // TODO add debounce
              disabled={posts.length < 1}
              color="secondary"
              startIcon={<DeleteIcon />}
              children={"Dismiss All"}
              onClick={dismissAllPosts}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LeftPanelContent;
