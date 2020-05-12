import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import redditImage from "../../../../assets/images/reddit.png";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const PostItem = ({ post, dismissPost, selectPost, onSelect }) => {
  const {
    author,
    id,
    num_comments,
    thumbnail,
    created_utc,
    title,
    read,
  } = post;
  const image = thumbnail.substring(0, 4) === "http" ? thumbnail : redditImage;

  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: read ? "#ccc" : "#0079d3",
            width: "1rem",
            height: "1rem",
            marginRight: "1rem",
          }}
        >
          {" "}
        </div>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          {author}
        </Typography>
      </div>
      <div>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          {created_utc}
        </Typography>
      </div>
    </div>
  );

  const renderBody = () => (
    <div
      style={{
        display: "flex",
        width: "auto",
        marginTop: "10px",
        height: "120px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "100%",
          marginRight: "8px",
          display: "flex",
        }}
      >
        <img
          alt="text "
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
          src={image}
        />
      </div>
      <div
        style={{
          width: "55%",
          maxHeight: "calc(20.2px * 4)",
          overflowY: "hidden",
        }}
      >
        <Typography
          style={{ textOverflow: "ellipsis" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {title}
        </Typography>
      </div>
      <div style={{ width: "5%" }}>
        <ArrowForwardIosIcon fontSize="small" />
      </div>
    </div>
  );

  const renderFooter = () => (
    <CardActions disableSpacing style={{ justifyContent: "space-between" }}>
      <Button
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => dismissPost({ id })}
        children={"Dismiss Post"}
      />
      <Badge
        color="secondary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={num_comments}
      >
        <MessageIcon />
      </Badge>
    </CardActions>
  );

  return (
    <Card style={{ padding: "12px 16px 12px 12px" }}>
      <div
        onClick={() => {
          selectPost({ id });
          onSelect(false);
        }}
        style={{ height: "100%", cursor: "pointer" }}
      >
        {renderHeader()}
        {renderBody()}
      </div>
      {renderFooter()}
    </Card>
  );
};

export default PostItem;
