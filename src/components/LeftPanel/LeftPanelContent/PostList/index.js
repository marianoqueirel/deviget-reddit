import { connect } from "react-redux";
import PostList from "./PostList";
import { getPostsNextPage } from "../../../../store/reddit/actions";

export default connect(null, { getPostsNextPage })(PostList);
