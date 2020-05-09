import { connect } from "react-redux";
import PostDescription from "./PostDescription";

const mapStateToProps = () => ({
  post: {},
});

export default connect(mapStateToProps)(PostDescription);
