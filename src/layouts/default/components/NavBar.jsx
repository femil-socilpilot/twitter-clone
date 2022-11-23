import React, { Component } from 'react'
import { connect } from 'react-redux';

export class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchWord: '',
            searchResult: []
        }
    }

    render() {
        return (
            <div className='my-6 mr-4 border-b border-white'>
                <div className='mb-2 relative'>
                    <div className='w-full relative'>
                        <input
                            type="text"
                            className='border outline-none w-full rounded-full bg-transparent px-6 py-3 focus:border-blue-600'
                            placeholder='Search Users'
                            value={this.state.searchWord}
                            onChange={e => {
                                this.setState({
                                    searchWord: e.target.value
                                }, () => {
                                    if (e.target.value) {
                                        let aa = this.props?.users.filter(user => {
                                            return user.fullName.toLowerCase().includes(this.state.searchWord.toLowerCase()) || user.userName.toLowerCase().includes(this.state.searchWord.toLowerCase())
                                        })
                                        this.setState({
                                            searchResult: aa
                                        })
                                    }
                                })
                            }}
                            onBlur={e => this.setState({ searchResult: [] })}
                        />
                        {this.state.searchWord && <span
                            className='absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 text-white w-6 h-6 cursor-pointer text-sm flex justify-center items-center'
                            onClick={e => this.setState({ searchWord: '' })}
                        >
                            X
                        </span>}
                    </div>
                    <ul className='absolute bg-gray-400 rounded-2xl w-full'>
                        {this.state.searchResult?.map(
                            user => {
                                return (
                                    <li className='flex gap-4 px-2 py-1 z-[99] relative' key={user.id}>
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
                            }
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.auth.users
})

export default connect(mapStateToProps)(NavBar)