import React from 'react';

const Divider = ({orientation}) => {
    const className=`divider-${orientation}`;
    return (
        <div className={className}></div>
    );
}

export default Divider;
