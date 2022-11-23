import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PasswordRegEx } from '../../../utils/Constants';

export class LogIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: "",
            password: "",
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    isUserExist = (email) => {
        return this.props.users.find(user => user.userEmail === email)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            password: this.state.password,
            userEmail: this.state.userEmail,
        }
        const user = this.isUserExist(payload.userEmail)
        if (user?.userEmail) {
            if (user.password === payload.password) {
                localStorage.setItem('user', JSON.stringify(user))
                alert('Log in Successfully !')
                this.props.getUserFromLs()
                this.props.navigate('/')
            } else {
                alert('Password is wrong !')
            }
        } else {
            alert('User not exist !')
        }


        // this.props.signUpApi(payload)
        // this.props.navigate('/')
    }

    render() {
        return (
            <div className='my-12'>
                <h1 className='text-2xl font-bold mb-4'>Log In !</h1>
                <form onSubmit={e => this.handleSubmit(e)} className='max-w-2xl'>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <input className='input'
                                type="email"
                                name="userEmail"
                                id="userEmail"
                                placeholder='Email'
                                autoComplete='username'
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div>
                            <input className='input'
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                onChange={e => this.handleChange(e)}
                                autoComplete='current-password'
                                // pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/}
                                // pattern={PasswordRegEx}
                                title="Minimum eight characters, at least one letter, one number and one special character"
                            />
                        </div>
                        <button className='blue-btn'>Sign Up</button>
                    </div>
                </form>
                <div className='flex gap-4 text-xs mt-5'>
                    <Link to={'/signup'}>created account</Link>
                    <Link to={'/forgot-password'}>Reset Password</Link>

                </div>
            </div>
        )
    }
}

export default LogIn