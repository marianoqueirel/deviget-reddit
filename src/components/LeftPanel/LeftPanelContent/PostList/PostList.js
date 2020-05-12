import React, { Fragment, useState, useEffect } from "react";
import PostItem from "../PostItem";
import { animated, useTransition } from "react-spring";
import Grid from "@material-ui/core/Grid";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const PostList = ({ onSelectPost, posts, getPostsNextPage }) => {
  useEffect(() => {
    setIsNextPageLoading(false);
  }, [posts]);

  const animatedPosts = useTransition(posts, (post) => post.id, {
    config: { duration: 250 },
    from: { opacity: 0, transform: "translate3d(0%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
  });
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  const loadNextPage = (...args) => {
    setIsNextPageLoading(true);
    getPostsNextPage();
  };

  const itemCount = hasNextPage ? posts.length + 1 : posts.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < posts.length;

  const Post = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = (
        <Grid item xs={12} key={posts[index].id}>
          <animated.div
            key={posts[index].id}
            style={animatedPosts[index].props}
          >
            <PostItem post={posts[index]} onSelect={onSelectPost} />
          </animated.div>
        </Grid>
      );
    }

    return <div style={style}>{content}</div>;
  };

  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={700}
            itemCount={itemCount}
            itemSize={304}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={"100%"}
          >
            {Post}
          </List>
        )}
      </InfiniteLoader>
    </Fragment>
  );
};

export default PostList;
