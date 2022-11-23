import React, { Component } from 'react'
import api from '../../../api';
import { PasswordRegEx, TweetImgFormats } from '../../../utils/Constants';

export class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: {
                firstName: "",
                lastName: '',
                password: "",
                userEmail: "",
                userName: "",
                userImage: null,
            },
            confirmPassword: "",
            file: null
        }
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        if (name !== 'confirmPassword') {
            this.setState(state => {
                state.userData = {
                    ...state.userData,
                    [name]: value
                }
                return state
            });
        } else {
            this.setState({ confirmPassword: value });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        if (this.state.userData.password !== this.state.confirmPassword) {
            alert(`Password didn't match.`)
            return
        }

        const data = new FormData()
        data.append("file", this.state.file)
        data.append("upload_preset", "usersimg")
        data.append("cloud_name", "dczmdqrkz")

        let config = {
            onUploadProgress: progressEvent => {
                let completed = (progressEvent.loaded / progressEvent.total) * 100
                // this.loading.current.style.width = `${completed}%`
                console.log(completed)
            }
        }

        try {
            const res = await (await api.post("https://api.cloudinary.com/v1_1/dczmdqrkz/image/upload", data, config)).data
            this.setState(state => {
                state.userData.userImage = res.url
                return state
            }, () => {
                const payload = {
                    fullName: this.state.userData.firstName.trim() + ' ' + this.state.userData.lastName.trim(),
                    password: this.state.userData.password,
                    userEmail: this.state.userData.userEmail,
                    userName: this.state.userData.userName,
                    userImage: this.state.userData.userImage,
                    following: []
                }
                this.props.signUpApi(payload)
                this.props.navigate('/')

            })

        } catch (error) {
            console.log(error);
        }
    }

    handleFileChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (TweetImgFormats.includes(file.type)) {
            this.setState({ file: file })
            this.setState(state => {
                state.userData.userImage = URL.createObjectURL(file)
                return state
            })
        }
    }

    render() {
        return (
            <div className='my-12'>
                <h1 className='text-2xl font-bold mb-4'>Create Account !</h1>
                <form onSubmit={e => this.handleSubmit(e)} className='max-w-2xl'>
                    <div className='flex flex-col gap-6'>
                        <div className='w-32 h-32 rounded-full overflow-hidden bg-white relative flex justify-center items-center'>
                            <input
                                type="file"
                                name="userImg"
                                id="userImg"
                                className='absolute top-0 left-0 w-full h-full opacity-0'
                                onChange={e => this.handleFileChange(e)}
                            />
                            {<img src={this.state.userData.userImage} alt={this.state.userData.firstName} />}
                        </div>
                        <div className='flex gap-6'>
                            <input className='input' name='firstName' placeholder='First Name' onChange={e => this.handleChange(e)} />
                            <input className='input' name='lastName' placeholder='Last Name' onChange={e => this.handleChange(e)} />
                        </div>
                        <div>
                            <input className='input' type="text" name='userName' id="userName" placeholder='User Name' onChange={e => this.handleChange(e)} />
                        </div>
                        <div>
                            <input className='input' type="email" name="userEmail" id="userEmail" placeholder='Email' onChange={e => this.handleChange(e)} />
                        </div>
                        <div>
                            <input className='input'
                                pattern={PasswordRegEx}
                                title="Minimum eight characters, at least one letter, one number and one special character"
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div>
                            <input className='input'
                                pattern={PasswordRegEx}
                                title="Minimum eight characters, at least one letter, one number and one special character"
                                type="password"
                                name="confirmPassword"
                                id="passwordconfirmPassword"
                                placeholder='Confirm Password'
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <button className='blue-btn'>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp