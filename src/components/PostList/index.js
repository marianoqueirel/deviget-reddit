import { connect } from "react-redux";
import PostList from "./PostList";

const mapStateToProps = () => ({
  posts: [],
});

export default connect(mapStateToProps)(PostList);
