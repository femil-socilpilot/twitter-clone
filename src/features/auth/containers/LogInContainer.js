import { connect } from "react-redux";
import { createUser, getUserFromLs, getUsers } from "../actions/AuthActions";
import LogIn from "../pages/LogIn";

const mapStateToProps = state => ({
    users: state.auth.users
})
const mapDispatchToProps = dispatch => ({
    signUpApi: tweetData => {
        dispatch(createUser(tweetData));
    },
    getUsers: _ => {
        dispatch(getUsers())
    },
    getUserFromLs: _ => {
        dispatch(getUserFromLs())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)