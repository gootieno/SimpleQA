import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Dialog,
	DialogTitle,
	Collapse,
	TextField,
	DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles({
	joinRoomContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	admin: {
		display: 'flex',
		flexDirection: 'row',
	},
	student: {
		display: 'flex',
		flexDirection: 'row',
	},
});

function JoinRoom(props) {
	const [roomId, setRoomId] = useState('');
	// const [adminId, setAdminId] = useState()

	const handleRoomId = (e) => {
		setRoomId(e.target.value);
	};

	const participantSubmit = (e) => {
		e.preventDefault();
		console.log(roomId);
		window.location.href = `/${roomId}`;
	};

	const classes = useStyles();
	return (
		<div>
			<Dialog
				open={props.openModal}
				onClose={props.closeModal}
				aria-labelledby='form-dialog-title'
				aria-describedby='scroll-dialog-description'
				// fullWidth
				// maxWidth='sm'
			>
				<DialogTitle id='form-dialog-title'>Select Your Role</DialogTitle>
				<DialogContent style={{ paddingTop: '0px' }}>
					<div className={classes.joinRoomContainer}>
						<div className={classes.admin}>
							<Button
								style={{
									marginTop: '18px',
									textAlign: 'left',
									paddingRight: '58px',
									paddingTop: '4.5px',
								}}
								onClick={props.collapseAdmin}
								color='primary'
							>
								Admin
							</Button>
							<Collapse timeout={500} in={props.openAdmin}>
								<form>
									<TextField
										autoFocus
										margin='dense'
										id='adminId'
										label='Admin Id'
										style={{
											width: '10em',
											margin: '0px 18px',
										}}
									/>
									<Button
										variant='outlined'
										type='submit'
										color='primary'
										style={{
											padding: '5px 5px',
											marginTop: '5px',
										}}
									>
										Join Room
									</Button>
								</form>
							</Collapse>
						</div>
						<div className={classes.student}>
							<Button
								style={{ marginTop: '16px', paddingTop: '4.5px' }}
								color='primary'
								onClick={props.collapseStudent}
							>
								Participant
							</Button>
							<Collapse timeout={500} in={props.openStudent}>
								<form onSubmit={participantSubmit}>
									<TextField
										margin='dense'
										id='roomId'
										value={roomId}
										onChange={handleRoomId}
										label='Room Id'
										style={{
											width: '10em',
											margin: '0px 18px',
										}}
									/>
									<Button
										variant='outlined'
										type='submit'
										color='primary'
										style={{
											padding: '5px 5px',
											marginTop: '5px',
										}}
									>
										Join Room
									</Button>
								</form>
							</Collapse>
						</div>
					</div>
				</DialogContent>
				{/* <DialogContent></DialogContent> */}
			</Dialog>
		</div>
	);
}

export default JoinRoom;
