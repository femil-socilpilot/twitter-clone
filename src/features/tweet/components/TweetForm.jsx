import React, { Component, createRef } from 'react'
import { TweetImgFormats } from '../../../utils/Constants'

// icons
import { BiLocationPlus, BiQrScan, BiUser } from 'react-icons/bi'
import { BsEmojiWink, BsFileImage } from 'react-icons/bs'
import { Navigate } from 'react-router-dom'
import api from '../../../api'
import { ImgInput } from '../../../components/micro'

export class TweetForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
            tweetData: {
                tweet: "",
                imgUrl: "",
                likes: {
                    totalLikes: 0,
                    likeBy: []
                }
            },
            userRole: 'guesst',
            hashStart: false,
            isEdited: false
        }

        this.textAreaRef = createRef()
        this.wrapper = createRef()
        this.editableInput = createRef()
        this.readonlyInput = createRef()
        this.placeholder = createRef()
        this.counter = createRef()
        this.button = createRef()
        this.loading = createRef()

        this.selectorRef = React.createRef(null);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps?.editTweetData !== this.props.editTweetData) {
            this.setState({ isEdited: true })
            this.setState({ tweetData: this.props.editTweetData.tweetData })
            // console.log(this.props.editTweetData);
            this.editableInput.current.innerText = this.props.editTweetData?.tweetData?.tweet
            this.placeholder.current.style.display = "none";
            this.setState(state => {
                state.tweetData.imgUrl = this.props.editTweetData?.tweetData?.imgUrl
                return state
            })
        }
    }

    clearForm = () => {

    }

    uploadImg = async (data, config, payload) => {
        try {
            const res = await (await api.post("https://api.cloudinary.com/v1_1/dczmdqrkz/image/upload", data, config)).data
            this.setState(state => {
                state.tweetData.imgUrl = res.url
                return state
            }, () => {
                console.log(this.state.isEdited, this.props.editTweetData.id);
                if (this.state.isEdited && this.props.editTweetData.id) {
                    console.log(888);
                    this.props.editTweet({
                        "userId": this.props.editTweetData.userId,
                        "createdDate": this.props.editTweetData.createdDate,
                        "updatedDate": new Date(),
                        "tweetData": this.state.tweetData,
                        "id": this.props.editTweetData.id
                    })?.then(a => this.props.getTweets())
                } else {
                    console.log(999);
                    this.props.postTweet({
                        "userId": this.props.user.id,
                        "createdDate": new Date(),
                        "updatedDate": new Date(),
                        "tweetData": this.state.tweetData,
                    })?.then(a => this.props.getTweets())
                }
                this.setState({ isEdited: false })
            })

            return res

        } catch (error) {
            console.log(error);
        }
    }

    hadleTweetSubmit = async (e) => {
        e.preventDefault()

        let config = {
            onUploadProgress: progressEvent => {
                let completed = (progressEvent.loaded / progressEvent.total) * 100
                this.loading.current.style.width = `${completed}%`
            }
        }

        const payload = {
            "userId": this.props.user.id,
            "createdDate": new Date(),
            "updatedDate": null,
            "tweetData": this.state.tweetData,
        }

        if (this.state.file) {
            const data = new FormData()
            data.append("file", this.state.file)
            data.append("upload_preset", "twitter")
            data.append("cloud_name", "dczmdqrkz")

            this.uploadImg(data, config, payload)

        } else {
            if (this.state.isEdited) {
                // this.state.tweetData
                this.props.editTweet({
                    "userId": this.props.editTweetData.userId,
                    "createdDate": this.props.editTweetData.createdDate,
                    "updatedDate": new Date(),
                    "tweetData": this.state.tweetData,
                    "id": this.props.editTweetData.id
                }).then(a => {
                    this.props.getTweets()
                })
            } else {
                this.props.postTweet(payload)
                this.props.getTweets()
            }
        }

        // this.setState({
        //     tweetData: {}
        // })
        this.editableInput.current.innerText = ''
        this.readonlyInput.current.innerText = ''
        this.loading.current.style.width = `0`

    }


    handleFileChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (TweetImgFormats.includes(file.type)) {
            this.setState({ file })
            this.setState(state => {
                state.tweetData.imgUrl = URL.createObjectURL(file)
                return state
            })
        }
    }

    validated = (e, element) => {
        let text;
        let maxLength = 128;
        let currentlength = element.innerText.length;

        if (currentlength <= 0) {
            this.placeholder.current.style.display = "block";
            this.counter.current.style.display = "none";
            this.button.current.classList.remove("active");
        } else {
            this.placeholder.current.style.display = "none";
            this.counter.current.style.display = "block";
            this.button.current.classList.add("active");
        }
        this.counter.current.innerText = maxLength - currentlength;
        if (currentlength > maxLength) {
            let overText = element.innerText.substr(maxLength); //extracting over texts
            overText = `<span class="highlight">${overText}</span>`; //creating new span and passing over texts
            text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
            this.readonlyInput.current.style.zIndex = "1";
            this.counter.current.style.color = "#e0245e";
            this.button.current.classList.remove("active");
        } else {
            this.readonlyInput.current.style.zIndex = "1";
            this.counter.current.style.color = "#333";
            this.setState(state => {
                state.tweetData.tweet = element.innerText
                state.tweetData.tweet = element.innerText
                return state
            })
        }
        this.readonlyInput.current.innerHTML = text; //replacing innerHTML of readonly div with textTag value
    }

    addHastag = (e) => {
        const key = e.which || e.keyCode
        if (key === 35) {
            this.setState({ hashStart: true })
        }

        if (key === 32 && this.state.hashStart) {
            let i = e.target.innerText.indexOf('#')
            let tag = e.target.innerText.slice(i)
            const span = document.createElement('span')
            span.innerText = tag
            span.classList.add('hashtag')
            this.readonlyInput.current.innerHTML = `<span>${tag}</span>`
            this.readonlyInput.current.style.zIndex = "1";
            this.setState({ hashStart: false })
        }
    }


    render() {
        return (
            <div className="wrapper">
                <span className='fixed top-0 left-0 w-0 h-1 bg-blue-500' ref={this.loading}></span>
                {this.state.userRole === 'guest' && <Navigate to={'/signup'} />}
                <div className="input-box">
                    <div className="tweet-area">
                        <span className="placeholder" ref={this.placeholder}>What's happening?</span>
                        <div
                            className="input editable"
                            contentEditable="true"
                            spellCheck="false"
                            onKeyUp={e => this.validated(e, e.target)}
                            onKeyPress={e => this.addHastag(e)}
                            onFocus={e => { this.placeholder.current.style.color = "#c5ccd3"; }}
                            ref={this.editableInput}
                        ></div>
                        <div
                            className="input readonly"
                            contentEditable="true"
                            spellCheck="false"
                            ref={this.readonlyInput}
                        ></div>
                    </div>
                    {this.state.tweetData.imgUrl &&
                        <div className='mt-2'>
                            <img src={this.state.tweetData.imgUrl} alt={'sd'} />
                        </div>
                    }
                    <div className="privacy">
                        <i className="fas fa-globe-asia"></i>
                        <span>Everyone can reply</span>
                    </div>
                </div>
                <div className="bottom">
                    <ul className="icons">
                        <li><BiQrScan /></li>
                        <li className='relative w-6 h-6 overflow-hidden cursor-pointer'>
                            <BsFileImage className='cursor-pointer' />
                            <ImgInput
                                type="file"
                                name="img"
                                id="tweetImg"
                                onChange={(e) => this.handleFileChange(e)}
                                multiple accept={TweetImgFormats}
                                className='absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer z-10'
                            />
                        </li>
                        <li><BiLocationPlus /></li>
                        <li><BsEmojiWink /></li>
                        <li><BiUser /></li>
                    </ul>
                    <div className="content">
                        <span className="counter" ref={this.counter}>100</span>
                        <button ref={this.button} type='submit' onClick={e => this.hadleTweetSubmit(e)}>Tweet</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TweetForm