import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { dismissPost } from "../../../store/reddit/actions";

export default connect(null, { dismissPost })(PostListItem);
