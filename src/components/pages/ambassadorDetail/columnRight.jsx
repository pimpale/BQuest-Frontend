import React from 'react';

class ColumnRight extends React.Component {
    render() {
        return (
            <div className="column-right">
                <div className="bio">
                    <h2>Bio</h2>
                    <p>{this.props.mentor.get('bio')}</p>
                </div>
                <div className="classes-taken">
                    <h2>Classes I've Taken</h2>
                    <div className="courses">
                        {this.props.mentor.get('courses').map(course => {
                            return <span key={course.get('id')}>{course.get('name')}</span>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnRight;