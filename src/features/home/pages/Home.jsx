import React, { Component } from 'react'
import TweetList from '../../tweet/containers/TweetListContainer'

// icons
import TweetForm from '../../tweet/containers/createTweetContainer'

export class Home extends Component {

    render() {
        return (
            <div>
                <div>
                    <h1>Home</h1>
                    <TweetForm />
                    <div>
                        <TweetList />
                    </div>
                </div>
            </div >
        )
    }
}

export default Home