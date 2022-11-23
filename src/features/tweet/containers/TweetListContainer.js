import { connect } from "react-redux";
import { getUsers, updateUser } from "../../auth/actions/AuthActions";
import { deleteTweet, getTweets, likeTweet, setEditTweet } from "../actions/TweetActions";
import TweetList from "../components/TweetList";

const mapStateToProps = state => {
    return {
        loading: state.auth.loading || state.tweet.loading,
        tweets: state.tweet.tweets,
        users: state.auth.users,
        user: state.auth.user,
        isUserLogedIn: state.auth.isUserLogedIn
    }
}
const mapDispatchToProps = dispatch => ({
    getTweets: config => {
        dispatch(getTweets(config));
    },
    getUsers: _ => {
        dispatch(getUsers());
    },
    updateUser: user => {
        dispatch(updateUser(user))
    },
    deleteTweet: id => dispatch(deleteTweet(id)),
    setEditTweet: tweet => dispatch(setEditTweet(tweet)),
    likeTweet: tweet => dispatch(likeTweet(tweet))
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetList)