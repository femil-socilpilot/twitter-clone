import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class LeftAside extends Component {
    render() {
        return (
            <div className='w-1/5'>
                <div>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <button className='blue-btn'>Tweet</button>
                    </ul>
                </div>
            </div>
        )
    }
}

export default LeftAside