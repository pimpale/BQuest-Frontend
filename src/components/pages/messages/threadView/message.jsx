import React from 'react';
import ProfilePicture from 'components/profilePicture';

export default ({messageText, messageSender, currentUser}) => {
	let classNames = ["message"];
	const position = currentUser == messageSender.get('id') ? "self" : null;
	classNames.push(position);

	return (
		<div className={classNames.join(' ')}>
			<ProfilePicture picture={messageSender.get('picture')} size="xsmall"/>
			<div className="bubble">
				<p className="message-content">{messageText}</p>
			</div>
		</div>
	);
}
