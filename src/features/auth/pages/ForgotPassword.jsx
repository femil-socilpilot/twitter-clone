import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getUsers } from '../actions/AuthActions';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isEmailValid: false,
            user: null
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.email) {
            // let link =
            const user = this.props.users.find(user => user.userEmail === this.state.email)
            if (user) {
                this.setState({
                    user: user,
                    isEmailValid: true
                })
            }
            else {
                alert('User not found !!')
            }
        }

    }
    render() {
        return (
            <div className='my-12'>
                <h1 className='text-2xl font-bold mb-4'>Reset Password !</h1>
                {!this.state.isEmailValid ?
                    <form onSubmit={e => this.handleSubmit(e)} className='max-w-2xl'>
                        <div className='flex flex-col gap-6'>
                            <div>
                                <input className='input' type="email" name="email" id="email" placeholder='Email' onChange={e => this.handleChange(e)} />
                            </div>
                            <button className='blue-btn'>Reset Password</button>
                        </div>
                    </form> :
                    <div>
                        <Link to={`/forgot-password/${this.state.user.id}`} replace='true' state={{ isValid: true }}>{`http://localhost:3000/forgot-password/${this.state.user.id}`}</Link>
                    </div>}
                <div className='flex gap-4 text-xs mt-5'>
                    <Link to={'/login'}>Log In</Link>
                    <Link to={'/signup'}>created account</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.auth.users
})
const mapDispatchToProps = dispatch => ({
    getUsers: _ => dispatch(getUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)