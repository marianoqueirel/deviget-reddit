import { connect } from "react-redux";
import PostList from "./PostList";
import { dismissAllPosts } from "../../../store/reddit/actions";

export default connect(null, { dismissAllPosts })(PostList);
