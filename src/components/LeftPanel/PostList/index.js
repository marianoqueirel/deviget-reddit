import { connect } from "react-redux";
import PostList from "./PostList";
import {
  dismissAllPosts,
  undoDismissAllPosts,
} from "../../../store/reddit/actions";
import {
  getPosts,
  isUndoDismissAllPosts,
} from "../../../store/reddit/selector";
import { isLoading } from "../../../store/loader/selector";

const mapStateToProps = (state) => ({
  posts: getPosts(state),
  loading: isLoading(state),
  showUndoDismissAllPosts: isUndoDismissAllPosts(state),
});

export default connect(mapStateToProps, {
  dismissAllPosts,
  undoDismissAllPosts,
})(PostList);
