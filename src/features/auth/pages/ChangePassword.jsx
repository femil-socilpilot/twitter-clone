import React, { Component } from 'react'
import { connect } from 'react-redux';
import withRouter from '../../../components/HOC/withRouter';
import { PasswordRegEx } from '../../../utils/Constants';
import { getUsers, updateUser } from '../actions/AuthActions';

export class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmPassword: ''
        }
    }

    componentDidMount() {
        console.log(this.props.location?.state?.isValid);
        if (!this.props.location?.state?.isValid) {
            this.props.navigate('/forgot-password')
            return
        }
        this.props.getUsers()
    }
    // componentDidUpdate() {
    //     console.log(5454);
    // }
    handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.password === this.state.confirmPassword) {
            const user = this.props.users.find(user => user.id === parseInt(this.props.params.id))
            this.props.updateUser({ ...user, password: this.state.password }).then(a => {
                alert('Password change !')
                this.props.navigate('/login')
            })
            return
        }
        alert('Password do not match !')
    }
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)} className='max-w-2xl my-12'>
                <div className='flex flex-col gap-6'>
                    <div>
                        <input className='input'
                            type="text"
                            name="password"
                            id="password"
                            placeholder='Password'
                            onChange={e => this.handleChange(e)}
                            pattern={PasswordRegEx}
                            title="Minimum eight characters, at least one letter, one number and one special character"
                        />
                    </div>
                    <div>
                        <input className='input'
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            onChange={e => this.handleChange(e)}
                            pattern={PasswordRegEx}
                            title="Minimum eight characters, at least one letter, one number and one special character"
                        />
                    </div>
                    <button className='blue-btn'>Change Password</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    users: state.auth.users
})
const mapDispatchToProps = dispatch => ({
    getUsers: _ => dispatch(getUsers()),
    updateUser: user => dispatch(updateUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword))