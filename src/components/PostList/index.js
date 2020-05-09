import { connect } from "react-redux";
import PostList from "./PostList";
import { getPosts } from "../../store/reddit/selector";
import { isLoading } from "../../store/loader/selector";

const mapStateToProps = (state) => ({
  loading: isLoading(state),
  posts: getPosts(state),
});

export default connect(mapStateToProps)(PostList);
