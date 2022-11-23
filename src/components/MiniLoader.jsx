import React, { Component } from 'react'

export class MiniLoader extends Component {
    render() {
        return (
            <div>
                <svg style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', }} width="100px" height="100px"
                    viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#0055a5" strokeWidth="4" r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.7092198581560283s"
                            values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </div>
        )
    }
}

export default MiniLoader