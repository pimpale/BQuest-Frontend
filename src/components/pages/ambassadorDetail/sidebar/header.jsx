import React from 'react';

export default ({searchedMajor, count}) => {
    return (
        <div className="header">
            <p>{searchedMajor}</p>
            <p>{count}</p>
        </div>
    );
}