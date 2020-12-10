import React from 'react';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TextField,
} from '@material-ui/core';

function AnsweredQuestions(props) {
	const replyArr = [...props.replies.admin, ...props.replies.student];
	return (
		<Dialog
			open={props.openReplies}
			onClose={props.closeReplies}
			aria-labelledby='form-dialog-title'
			aria-describedby='scroll-dialog-description'
			fullWidth
			maxWidth='sm'
		>
			{/* <Delete deleteId={props.deleteId} toggleDelete={props.toggleDelete} /> */}
			<DialogTitle id='form-dialog-title'>Replies</DialogTitle>

			<DialogContent>
				{replyArr.map((reply, i) => (
					<div key={`${i}-${i + 12}`}>
						<DialogContentText id='form-dialog-description'>
							Answer: <br />
							{reply}
						</DialogContentText>
					</div>
				))}
			</DialogContent>
		</Dialog>
	);
}

export default AnsweredQuestions;
