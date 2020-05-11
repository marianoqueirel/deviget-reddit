import { connect } from "react-redux";
import LeftPanel from "./LeftPanel";
import { isLoading } from "../../store/loader/selector";

const mapStateToProps = (state) => ({
  loading: isLoading(state),
});

export default connect(mapStateToProps)(LeftPanel);
