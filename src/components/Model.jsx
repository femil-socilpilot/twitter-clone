import React, { Component } from 'react';


const ModelWrapper = (children) => {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm'>
            {children}
        </div>
    )
}

const Aodel = (WrappedComponent, selectData) => {

    class Model extends Component {
        render() {
            return <WrappedComponent {...this.props} />
        }

    }

    return Model

}

export default Aodel
