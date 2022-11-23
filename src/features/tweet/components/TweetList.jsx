import React, { Component } from 'react';

// icons
import { AiFillEdit, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import MiniLoader from '../../../components/MiniLoader';

export class TweetList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tweets: [],
            users: [],
        }
    }

    componentDidMount() {
        this.props.getTweets({
            sort: 'id',
            order: 'desc'
        })
        this.props.getUsers()
        this.setState({ tweets: this.props.tweets, users: this.props.users })
    }

    renderTweets = () => {
        return this.props.tweets.filter(tweet => {
            if (this.props?.user?.following?.includes(tweet.userId) && this.props.isUserLogedIn) {
                const bb = this.props.users.find(user => user.id === tweet.userId)
                if (!tweet.user) {
                    tweet.user = bb
                }
                return tweet
            } else if (!this.props.isUserLogedIn || this.props?.user?.following.length === 0) {
                const bb = this.props.users.find(user => user.id === tweet.userId)
                if (!tweet.user) {
                    tweet.user = bb
                }
                return tweet
            }
        })
    }

    unfollowUser = (id) => {
        let user = structuredClone(this.props.user)
        user.following.splice(user.following.indexOf(id), 1)
        this.props.updateUser(user)
    }

    handleEditTweet = id => {
        const editTweetData = this.props.tweets.find(tweet => {
            return tweet.id === id
        })
        this.props.setEditTweet(editTweetData)
    }

    handleDeleteTweet = (id) => {
        this.props.deleteTweet(id)
        this.props.getTweets({
            sort: 'id',
            order: 'desc'
        })
    }

    addLike = (tweetId, userId) => {
        let findTweet = this.props.tweets.find(tweet => tweet.id === tweetId)
        const isUserAlredyLiked = findTweet?.tweetData?.likes?.likeBy?.find(id => id === userId)
        delete findTweet.user
        if (isUserAlredyLiked) {
            findTweet.tweetData.likes = {
                totalLikes: findTweet.tweetData.likes.totalLikes > 0 && findTweet.tweetData.likes.totalLikes - 1,
                likeBy: [...findTweet.tweetData.likes.likeBy.filter(id => id !== userId)]
            }
        } else {
            findTweet.tweetData.likes = {
                totalLikes: findTweet.tweetData?.likes?.totalLikes + 1,
                likeBy: [...findTweet.tweetData?.likes?.likeBy, userId]
            }
        }
        this.props.likeTweet(findTweet)
    }

    render() {
        return (
            this.props.loading ? <MiniLoader /> : <ul className='flex flex-col gap-6'>
                {this.renderTweets().map(data => {
                    const { tweet, imgUrl, likes } = data?.tweetData
                    return (
                        <li key={data?.id} className='flex gap-4' id={data?.id}>
                            <div className='bg-white rounded-full w-12 h-12 ring ring-white overflow-hidden relative'>
                                <img src={data?.user?.userImage} alt={data?.user?.userName} className='w-full h-full absolute inset-0' />
                            </div>
                            <div className='flex flex-col gap-2 flex-1'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2 justify-start items-end'>
                                        <h4>{data?.user?.fullName}</h4>
                                        <h6 className='opacity-60 text-sm'>@{data?.user?.userName}</h6>
                                        <h6
                                            className='opacity-40 text-sm cursor-pointer'
                                            onClick={e => this.unfollowUser(data?.user?.id)}
                                        >
                                            following
                                        </h6>
                                    </div>
                                    <div className='flex gap-4'>
                                        {data?.user?.id === this.props?.user?.id && <span className='cursor-pointer' onClick={e => this.handleEditTweet(data?.id)}><AiFillEdit /></span>}
                                        {data?.user?.id === this.props?.user?.id && <span className='cursor-pointer' onClick={e => this.handleDeleteTweet(data?.id)}><AiOutlineDelete /></span>}
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='mb-2'>{tweet}</p>
                                    {imgUrl &&
                                        <div className='relative rounded-2xl ring overflow-hidden h-56  w-full'>
                                            <img
                                                src={imgUrl}
                                                alt={'demo'}
                                                className={'absolute inset-0 w-full h-full'}
                                            />
                                        </div>
                                    }
                                </div>
                                <hr />
                                <div>
                                    <div className='flex justify-start gap-1 items-center' onClick={e => {
                                        e.preventDefault()
                                        this.addLike(data?.id, this.props?.user.id)
                                    }}>
                                        <AiOutlineHeart />
                                        <span>{likes?.totalLikes}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default TweetList