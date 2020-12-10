import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	DialogContentText,
} from '@material-ui/core';

function ReplyModal(props) {
	return (
		<Dialog
			open={props.openModal}
			onClose={props.closeModal}
			aria-labelledby='form-dialog-title'
			aria-describedby='scroll-dialog-description'
			fullWidth
			maxWidth='sm'
		>
			<DialogTitle id='form-dialog-title'>Reply</DialogTitle>
			<DialogContent>
				<DialogContentText id='form-dialog-description'>
					{props.question}
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					multiline
					name='admin'
					value={props.replyValue}
					fullWidth
					placeholder='Reply to question'
					onChange={props.replyChange}
					id='standard-full-width'
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.cancel} color={props.cancelColor}>
					Cancel
				</Button>
				<Button
					type='submit'
					onClick={props.submit}
					color='primary'
					style={{ marginRight: '8px' }}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ReplyModal;
