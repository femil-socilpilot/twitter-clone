const initialState = {
    loading: false,
    error: null,
    tweets: [],
    editTweetData: {}
}

const TweetReducer = (state = initialState, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case 'CREATE_TWEET':
            return state
        case 'GET_TWEETS_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'GET_TWEETS_FULFILLED':
            return {
                ...state,
                tweets: action.payload?.data,
                loading: false
            }
        case 'GET_TWEETS_REJECTED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case 'DELETE_TWEET_FULFILLED':
            return {
                ...state,
                loading: false
            }
        case 'DELETE_TWEET_PENDING':
            return {
                ...state,
                loading: true,
            }
        case "SET_EDIT_TWEET":
            return {
                ...state,
                editTweetData: action.payload
            }
        case "EDIT_TWEET_FULFILLED":
            return {
                ...state,
                loading: false
            }
        case "EDIT_TWEET_PENDING":
            return {
                ...state,
                loading: true
            }
        case "LIKE_TWEET_FULFILLED":
            return {
                ...state,
                loading: false
            }
        case "LIKE_TWEET_PENDING":
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default TweetReducer