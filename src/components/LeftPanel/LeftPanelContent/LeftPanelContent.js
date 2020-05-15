import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PostList from "./PostList";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import redditLogo from "../../../assets/images/reddit-logo-png-transparent.png";
import UndoIcon from "@material-ui/icons/Undo";

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
        }}
      >
        <img src={redditLogo} style={{ height: "85%" }} alt="Reddit Logo" />
      </div>
      <Fragment>
        <div style={{ height: "87%", overflowY: "auto" }}>
          {loading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : posts.length < 1 && showUndoDismissAllPosts ? (
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              height="100%"
            >
              <Button
                style={{ width: "100%" }}
                color="secondary"
                startIcon={<UndoIcon />}
                children={"5 Seconds to Undo"}
                onClick={undoDismissAllPosts}
              />
            </Box>
          ) : (
            <PostList posts={posts} onSelectPost={onSelectPost} />
          )}
        </div>
        <div
          style={{
            height: "6%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ff4500",
          }}
        >
          <Button
            // TODO add debounce
            fullWidth
            style={{ height: "100%" }}
            variant="contained"
            disableElevation
            disabled={posts.length < 1}
            color="secondary"
            startIcon={<DeleteIcon />}
            children={"Dismiss All"}
            onClick={dismissAllPosts}
          />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default LeftPanelContent;
