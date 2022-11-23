import { connect } from "react-redux";
import Home from "../pages/Home";

const mapStateToProps = state => ({
    tweets: state.tweets
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)