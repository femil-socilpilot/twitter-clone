import api from "../../../api";

const createTweet = tweetData => ({
    type: 'CREATE_TWEET',
    payload: tweetData
})

const getTweets = config => ({
    type: 'GET_TWEETS',
    payload: config ? api.get(`/tweets?_sort=${config.sort}&_order=${config.order}`) : api.get(`/tweets`)
})

const postTweet = tweetData => async dispatch => {
    try {
        const res = api.post(`/tweets`, tweetData)
        dispatch(createTweet(res))
    } catch (error) {
        console.log(error);
    }
}

const deleteTweet = id => ({
    type: 'DELETE_TWEET',
    payload: api.delete(`/tweets/${id}`)
})

const setEditTweet = tweet => ({
    type: 'SET_EDIT_TWEET',
    payload: tweet
})

const editTweet = tweet => ({
    type: 'EDIT_TWEET',
    payload: api.put(`/tweets/${tweet?.id}`, tweet)
})

const likeTweet = tweet => ({
    type: 'LIKE_TWEET',
    payload: api.put(`/tweets/${tweet?.id}`, tweet)
})


export { postTweet, getTweets, deleteTweet, setEditTweet, editTweet, likeTweet };

