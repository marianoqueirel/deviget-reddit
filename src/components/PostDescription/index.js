import { connect } from "react-redux";
import PostDescription from "./PostDescription";
import { getSelectedPost } from "../../store/reddit/selector";

const mapStateToProps = (state) => ({
  post: getSelectedPost(state),
});

export default connect(mapStateToProps)(PostDescription);
