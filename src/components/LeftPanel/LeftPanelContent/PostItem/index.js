import { connect } from "react-redux";
import PostItem from "./PostItem";
import { dismissPost, selectPost } from "../../../../store/reddit/actions";

export default connect(null, { dismissPost, selectPost })(PostItem);
