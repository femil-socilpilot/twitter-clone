import api from "../../../api"

const createUser = (user) => ({
    type: 'CREATE_USER',
    payload: api.post('/users', user)
})

const updateUser = user => ({
    type: "UPDATE_USER",
    payload: api.put(`/users/${user?.id}`, user)
})

const getUsers = () => ({
    type: 'ALL_USERS',
    payload: api.get('/users')
})

const getUserFromLs = () => ({
    type: "LOG_IN",
    payload: JSON.parse(localStorage.getItem('user'))
})


const userLogOut = () => {
    localStorage.clear()
    return {
        type: 'LOG_OUT'
    }
}


const isLoading = (isLoading) => ({
    type: 'LOADING',
    payload: isLoading
})

const signUpApi = user => async dispatch => {
    dispatch(isLoading(true))
    try {
        const res = dispatch(createUser(user))
        dispatch(isLoading(false))
        return res
    } catch (error) {
        dispatch(isLoading(false))
        console.log(error);
    }
}


export { signUpApi, createUser, getUsers, getUserFromLs, userLogOut, updateUser }