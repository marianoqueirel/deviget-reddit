import React, { Fragment, useState, useEffect, forwardRef } from "react";
import PostItem from "../PostItem";
import { animated, useTransition } from "react-spring";
import Grid from "@material-ui/core/Grid";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const PostList = ({ onSelectPost, posts, getPostsNextPage }) => {
  useEffect(() => {
    setIsNextPageLoading(false);
    setHasNextPage(true);
  }, [posts]);

  const animatedPosts = useTransition(posts, (post) => post.id, {
    config: { duration: 250 },
    from: { opacity: 0, transform: "translate3d(0%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
  });
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(true);

  const loadNextPage = () => {
    setIsNextPageLoading(true);
    getPostsNextPage();
  };

  const itemCount = hasNextPage ? posts.length + 1 : posts.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < posts.length;

  const Post = (props) => {
    const { index, style, data } = props;

    let content;
    if (!isItemLoaded(index)) {
      content = (
        <Box align="center" p={2}>
          <CircularProgress color="secondary" />
        </Box>
      );
    } else {
      content = (
        <animated.div
          style={{
            ...animatedPosts[index].props,
            width: "100%",
          }}
        >
          <PostItem post={data[index]} onSelect={onSelectPost} />
        </animated.div>
      );
    }

    return <div style={{ ...style, display: "flex" }}>{content}</div>;
  };

  const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        marginBottom: "50px",
      }}
      {...rest}
    />
  ));

  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer disableWidth>
            {({ height }) => (
              <List
                className="List"
                height={height}
                itemCount={itemCount}
                itemSize={310}
                onItemsRendered={onItemsRendered}
                innerElementType={innerElementType}
                ref={ref}
                width={"100%"}
                itemData={posts}
                itemKey={(index, posts) => {
                  return posts[index] ? posts[index].id : "loading";
                }}
              >
                {Post}
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Fragment>
  );
};

export default PostList;
