import React from 'react';

import { pluralize } from 'common';

export default ({numMessages, numUnread}) => {
    return (
        <div className="header">
            <h1>{numMessages} {pluralize(numMessages, "Message")}</h1>
        </div>
    );
}