import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
	Button,
	Dialog,
	Typography,
	Collapse,
	MenuItem,
	TextField,
	FormControl,
	Select,
	Stepper,
	Step,
	StepLabel,
	DialogContent,
} from '@material-ui/core';

const SelectWrapper = styled.div`
	#demo-simple-select {
		padding-left: 10px;
	}

	#room-input-buttons {
		margin-top: 10px;
	}
`;

const InputWrapper = styled.div``;

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	backButton: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	formContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		width: '12em',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	selectContainer: {
		display: 'flex',
		justifyContent: 'center',
	},

	roomField: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: '5px',
	},
	roomButtons: {
		marginTop: '10px',
	},
}));

const CreateRoom = (props) => {
	const classes = useStyles();
	return (
		<Dialog
			open={props.openModal}
			onClose={props.closeModal}
			aria-labelledby='form-dialog-title'
			aria-describedby='scroll-dialog-description'
			fullWidth
			maxWidth='sm'
		>
			<DialogContent>
				<Stepper activeStep={props.activeStep} alternativeLabel>
					{props.steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<div className={classes.selectContainer}>
					{props.activeStep === 0 && (
						<SelectWrapper>
							<div className={classes.formContainer}>
								<FormControl className={classes.formControl}>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={props.cohortName}
										onChange={props.setCohort}
										placeholder={props.stepContent}
									>
										<MenuItem value={10}>August Cohort</MenuItem>
										<MenuItem value={20}>September Cohort</MenuItem>
										<MenuItem value={30}>October Cohort</MenuItem>
									</Select>
								</FormControl>

								<Collapse timeout={500} in={props.cohortName ? true : false}>
									<Button
										variant='contained'
										color='primary'
										onClick={props.nextStep}
										size='medium'
									>
										Next
									</Button>
								</Collapse>
							</div>
						</SelectWrapper>
					)}
					{props.activeStep === 1 && (
						<InputWrapper>
							<div className={classes.roomField}>
								<div id='room-input'>
									<TextField
										id='standard-basic'
										onChange={props.setRoom}
										label='RoomName'
										value={props.roomName}
										className={classes.roomField}
									/>
								</div>
								<div className={classes.roomButtons}>
									<Button
										id='previous'
										disabled={props.activeStep === 0}
										onClick={props.prevStep}
										className={classes.backButton}
										variant='outlined'
										color='primary'
									>
										Back
									</Button>
									<Button
										id='next'
										variant='contained'
										color='primary'
										onClick={props.nextStep}
									>
										Next
									</Button>
								</div>
							</div>
						</InputWrapper>
					)}

					{props.activeStep === 2 && (
						<div>
							<Typography className={classes.instructions}>
								{props.stepContent}
							</Typography>
							<div>
								<Button
									id='previous'
									disabled={props.activeStep === 0}
									onClick={props.prevStep}
									className={classes.backButton}
									variant='outlined'
									color='primary'
								>
									Back
								</Button>
								{console.log(props.activeStep)}
								<Button
									variant='contained'
									color='primary'
									onClick={
										props.activeStep === props.steps.length - 1
											? props.handleSubmit
											: props.nextStep
									}
								>
									{props.activeStep === 2 ? 'Finish' : 'Next'}
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRoom;
