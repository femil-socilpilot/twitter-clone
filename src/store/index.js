import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import TweetReducer from "../features/tweet/reducers/TweetReducer";
import { globalReducer } from "../reducers/globalReducer";
// middlewares
import ReduxPromise from 'redux-promise-middleware'
import ReduxThunk from 'redux-thunk'
import AuthReducer from "../features/auth/reducers/AuthReducer";

const rootReducer = combineReducers({
    global: globalReducer,
    auth: AuthReducer,
    tweet: TweetReducer,
})


export default legacy_createStore(rootReducer, applyMiddleware(ReduxThunk, ReduxPromise))