import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import redditImage from "../../assets/images/reddit.png";

const PostDescription = ({ post }) => {
  const postSelected = Object.entries(post).length > 0;

  const renderPostContent = () => {
    const { author, thumbnail, created_utc, title } = post;
    const image =
      thumbnail.substring(0, 4) === "http" ? thumbnail : redditImage;
    return (
      <Fragment>
        <Typography variant="h4"> {author}</Typography>
        <Typography variant="h6">{created_utc}</Typography>
        <img
          style={{
            width: "50%",
            height: "auto",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          alt={`of ${author}`}
          src={image}
        />
        <Typography variant="body1">{title}</Typography>
      </Fragment>
    );
  };

  return (
    <Box
      style={{
        height: "100%",
        width: "90%",
        padding: "2%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        paddingTop: "12px",
      }}
    >
      {postSelected ? (
        renderPostContent()
      ) : (
        <Fragment>
          <Typography variant="h4">Welcome</Typography>
          <Typography variant="h5">Select Post</Typography>
          <img
            style={{
              width: "50%",
              height: "auto",
              marginTop: "10px",
            }}
            alt={"Reddit Main Image"}
            src={redditImage}
          />
        </Fragment>
      )}
    </Box>
  );
};

export default PostDescription;
