import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	deleteModal: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}));

export default function DeleteCard(props) {
	const classes = useStyles();
	return (
		<Dialog
			aria-labelledby='alert-dialog-delete-question'
			aria-describedby='alert-dialog-confirming-question-delete'
			open={props.openModal}
			onClose={props.closeModal}
		>
			<DialogTitle id='alert-dialog-delete-question'>
				{'Are you sure you want to delete?'}
			</DialogTitle>
			<DialogActions className={classes.deleteModal}>
				<Button onClick={props.cancel} color='primary'>
					Cancel
				</Button>
				<Button onSubmit={props.deleteCard} color='primary' autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
