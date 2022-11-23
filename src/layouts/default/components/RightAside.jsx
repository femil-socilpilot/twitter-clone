import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { updateUser, userLogOut } from '../../../features/auth/actions/AuthActions'

export class RightAside extends Component {
    constructor(props) {
        super(props)

        this.state = {
            aa: false
        }
    }

    handleLogout = (e) => {
        e.preventDefault()
        this.props.userLogOut()
    }

    updateUser = (e, id, type) => {
        let user = structuredClone(this.props.user)
        console.log(user);
        if (user) {
            if (type === 'follow') {
                user.following.push(id)
            } else if (type === 'unfollow') {
                user.following.splice(user.following.indexOf(id), 1)
            }
            this.props.updateUser(user)
        } else {
            this.setState({ aa: true })
            this.setState({ aa: false })
        }
    }
    componentWillUnmount() {
        this.setState({ aa: false })
    }

    render() {
        return (
            <div className='w-1/5 ml-4'>
                {this.state.aa && <Navigate to={'/login'} replace={true} />}
                <div>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                    </ul>
                    {this.props.isUserLogedIn ?
                        <button
                            type='button'
                            className='blue-btn'
                            onClick={e => this.handleLogout(e)}
                        >
                            Log Out
                        </button>
                        :
                        <Link
                            to={'/login'}
                            className='blue-btn'
                        >
                            Log In
                        </Link>
                    }
                </div>
                <div className='mt-8'>
                    <h2 className='mb-4'>Users</h2>
                    <ul className='flex flex-col gap-6'>
                        {
                            this.props.users?.map(user => {
                                return (
                                    <li className='flex gap-4' key={user.id}>
                                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                                            <img src={user?.userImage} alt={user?.userName} />
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex gap-2 justify-start items-center'>
                                                <h4>{user?.fullName}</h4>•
                                                {this.props.user?.following?.includes(user.id) ?
                                                    <span className='text-xs opacity-60 cursor-pointer' onClick={e => this.updateUser(e, user.id, 'unfollow')}>Following</span>
                                                    : <span className='text-xs opacity-90 cursor-pointer' onClick={e => this.updateUser(e, user.id, 'follow')}>Follow</span>
                                                }
                                            </div>
                                            <span className='text-sm opacity-60'>@{user?.userName}</span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isUserLogedIn: state.auth.isUserLogedIn,
    users: state.auth.users,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    userLogOut: _ => {
        dispatch(userLogOut())
    },
    updateUser: user => {
        dispatch(updateUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RightAside)