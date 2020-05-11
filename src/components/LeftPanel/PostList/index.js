import { connect } from "react-redux";
import PostList from "./PostList";
import { dismissAllPosts } from "../../../store/reddit/actions";
import { getPosts } from "../../../store/reddit/selector";

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});

export default connect(mapStateToProps, { dismissAllPosts })(PostList);
