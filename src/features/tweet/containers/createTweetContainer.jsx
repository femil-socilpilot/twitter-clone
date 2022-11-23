import { connect } from "react-redux";
import { editTweet, getTweets, postTweet } from "../actions/TweetActions";
import TweetForm from "../components/TweetForm";


const mapStateToProps = state => ({
    tweet: state.tweet,
    editTweetData: state.tweet.editTweetData,
    user: state.auth.user,
})
const mapDispatchToProps = dispatch => ({
    postTweet: tweetData => {
        dispatch(postTweet(tweetData));
    },
    editTweet: tweetData => dispatch(editTweet(tweetData)),
    getTweets: _ => {
        dispatch(getTweets());
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)