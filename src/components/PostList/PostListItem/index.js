import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { dismissPost, selectPost } from "../../../store/reddit/actions";

export default connect(null, { dismissPost, selectPost })(PostListItem);
