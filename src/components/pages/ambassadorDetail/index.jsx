import React from 'react';

import ColumnRight from './columnRight';
import ColumnLeft from './columnLeft';
import Modal from 'components/modal';
import Button from 'components/util/Button';

class AmbassadorDetail extends React.Component {
    state = {
        showModal: false,
        showReportModal: false,
        messageText: '',
        reportText: '',
    }

    onClick = () => {
        this.setState(prev => ({
            showModal: !prev.showModal
        }));
    }

    onReport = () => {
        this.setState(prev => ({
            showReportModal: !prev.showReportModal
        }));
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            showReportModal: false
        });
    }

    sendMessage = e => {
        e.preventDefault();
        this.closeModal();
        
        if (this.state.messageText !== '') {
            this.props.sendMessage(this.state.messageText, this.props.ambassador.getIn(['user', 'id']));
        }
    }

    sendReport = e => {
        e.preventDefault();
        this.closeModal();

        if (this.state.reportText !== '') {
            this.props.reportMentor(this.props.ambassador.getIn(['user', 'id']), this.state.reportText);
        }
    }

    onChange = e => {
        this.setState({
            messageText: e.target.value
        })
    }

    onReportChange = e => {
        this.setState({
            reportText: e.target.value
        })
    }

    render() {
        const ambassador = this.props.ambassador;
        const disabled = this.state.messageText === '';
        const reportDisabled = this.state.reportText === '';

        return (
            <div className="ambassador-detail">
                {this.state.showModal ? 
                    <Modal 
                        closeModal={this.closeModal}>
                        <p>Introduce yourself.</p>
                        <p>Ask them a question.</p>
                        <p>Request a meetup!</p>
                        <form onSubmit={e => e.preventDefault()}>
                            <input value={this.state.messageText} type="text" placeholder="Write something.." onChange={this.onChange}/>
                            <Button onClick={this.sendMessage} color="green" disabled={disabled}>Send</Button>
                        </form>
                    </Modal>     : null}
                {this.state.showReportModal ? 
                    <Modal 
                        closeModal={this.closeModal}>
                        <p>Explain your reasoning for reporting this ambassador.</p>
                        <form onSubmit={e => e.preventDefault()}>
                            <input value={this.state.reportText} type="text" placeholder="My reason is.." onChange={this.onReportChange}/>
                            <Button onClick={this.sendReport} color="green" disabled={reportDisabled}>Submit</Button>
                        </form>
                    </Modal>     : null}
                <div className="top-bar">
                    <span onClick={this.props.goBack}><i className="fa fa-arrow-left"></i> Search</span>
                </div>
                <div className="content">
                    <ColumnLeft
                        profile={ambassador.get('user')}
                        mentor={ambassador.get('mentor')}
                        onClick={this.onClick}
                        onReport={this.onReport}
                    />
                    <ColumnRight 
                        mentor={ambassador.get('mentor')}
                    />
                </div>
            </div>
        );
    }
}

export default AmbassadorDetail;
