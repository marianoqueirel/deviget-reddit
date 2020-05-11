import { connect } from "react-redux";
import PostList from "./PostList";
import { dismissAllPosts } from "../../../store/reddit/actions";
import { getPosts } from "../../../store/reddit/selector";
import { isLoading } from "../../../store/loader/selector";

const mapStateToProps = (state) => ({
  posts: getPosts(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps, { dismissAllPosts })(PostList);
