import { connect } from "react-redux";
import { createUser } from "../actions/AuthActions";
import SignUp from "../pages/SignUp";

const mapStateToProps = state => ({
    user: state.user
})
const mapDispatchToProps = dispatch => ({
    signUpApi: userData => {
        dispatch(createUser(userData));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)