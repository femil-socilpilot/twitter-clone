import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getUserFromLs, userLogOut } from '../../features/auth/actions/AuthActions'
import LeftAside from './components/LeftAside'
import NavBar from './components/NavBar'
import RightAside from './components/RightAside'

export class DefaultLayout extends Component {
    componentDidMount() {
        localStorage.getItem('user') && this.props.getUserFromLs()
    }

    render() {
        return (
            <div className='bg-black text-white min-h-screen'>
                <div className='border border-white max-w-7xl mx-auto flex h-full'>
                    <LeftAside />
                    <main className='w-3/5'>
                        <NavBar />
                        <Outlet />
                    </main>
                    <RightAside />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isUserLogedIn: state.auth.isUserLogedIn
})

const mapActionsToProps = dispatch => ({
    getUserFromLs: _ => {
        dispatch(getUserFromLs())
    },
    userLogOut: _ => {
        dispatch(userLogOut())
    }
})

export default connect(mapStateToProps, mapActionsToProps)(DefaultLayout)