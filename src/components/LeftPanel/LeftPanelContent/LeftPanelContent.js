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
        <div>Loading...</div>
      ) : (
        <Fragment>
          <div style={{ height: "86%", overflowY: "auto" }}>
            {posts.length < 1 && showUndoDismissAllPosts ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  color="secondary"
                  children={"5 Seconds to Undo"}
                  onClick={undoDismissAllPosts}
                />
              </div>
            ) : (
              <PostList posts={posts} onSelectPost={onSelectPost} />
            )}
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
