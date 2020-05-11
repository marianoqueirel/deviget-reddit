import React, { useState } from "react";
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

const PostItem = ({ post, dismissPost, selectPost, onSelect }) => {
  const [read, setRead] = useState(false);
  const { author, id, num_comments, thumbnail, created_utc, title } = post;
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
        <Avatar
          style={{
            backgroundColor: read ? "grey" : "blue",
            width: "1rem",
            height: "1rem",
            marginRight: "1rem",
          }}
        >
          {" "}
        </Avatar>
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
    <Grid container>
      <img alt="text " style={{ width: "100%", height: "10rem" }} src={image} />
      <Typography noWrap variant="h6" color="textSecondary" component="p">
        {title}
      </Typography>
    </Grid>
  );

  const renderFooter = () => (
    <CardActions disableSpacing style={{ justifyContent: "space-between" }}>
      <Button
        variant="contained"
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
    <Card style={{ padding: "20px" }}>
      <div
        onClick={() => {
          selectPost({ id });
          setRead(true);
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
