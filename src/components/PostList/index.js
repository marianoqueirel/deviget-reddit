import { connect } from "react-redux";
import PostList from "./PostList";
import { getPosts } from "../../store/reddit/selector";
import { isLoading } from "../../store/loader/selector";
import { dismissAllPosts } from "../../store/reddit/actions";

const mapStateToProps = (state) => ({
  loading: isLoading(state),
  posts: getPosts(state),
});

export default connect(mapStateToProps, { dismissAllPosts })(PostList);
