import React from 'react';

class Modal extends React.Component {
    render() {
        return (
            <div className="overlay" onClick={this.props.closeModal}>
                <div className="overlay-popup" onClick={e => e.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal;