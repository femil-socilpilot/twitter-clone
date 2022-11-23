const initialState = {
    loading: false,
    error: null,
    isUserLogedIn: false,
    user: null,
    users: []
}

const AuthReducer = (state = initialState, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case 'CREATE_USER_FULFILLED':
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            return {
                ...state,
                user: action.payload.data,
                isUserLogedIn: true
            }
        case 'UPDATE_USER_FULFILLED':
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            return {
                ...state,
                user: action.payload.data,
                loading: false
            }
        case 'UPDATE_USER_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'LOG_IN':
            return {
                ...state,
                user: action.payload,
                isUserLogedIn: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                user: null,
                isUserLogedIn: false
            }
        case 'ALL_USERS_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'ALL_USERS_FULFILLED':
            return {
                ...state,
                users: action.payload.data,
                loading: false
            }
        case 'ALL_USERS_REJECTED':
            return {
                ...state,
                error: action.payload.message,
                loading: false
            }
        default:
            return state
    }
}

export default AuthReducer