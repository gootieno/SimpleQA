import React, { useState } from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import homeImg from '../static/home-page-img.png'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import CreateRoom from './DialogModals/CreateRoom'
import JoinRoom from './DialogModals/JoinRoom'

const HomeWrapper = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	padding-top: 3rem;
	padding-bottom: 12rem;
	height: 100vh;
	width: 100vw;
	// background: linear-gradient(
	// 	to bottom,
	// 	${(props) => props.theme.red} 50%,
	// 	${(props) => props.theme.gray} 50%
	// );
	h1 {
		font-size: 3em;
	}
`

const LoginBox = styled.div`
	display: flex;
	background-color: white;
	justify-content: space-around;
	align-items: center;
	height: 50vh;
	width: 50vw;
	border-radius: 5px;
	margin: auto;
`

const RedColorButton = withStyles((theme) => ({
	root: {
		color: '#E03D3D',
		borderColor: '#E03D3D',
		'&:hover': {
			color: 'white',
			backgroundColor: '#FF6161',
			borderColor: 'black',
			boxShadow: '0 0 0 0.1rem rgba(0,0,0,.4)',
		},
	},
}))(Button)

const BlueColorButton = withStyles((theme) => ({
	root: {
		color: '#4894D9',
		borderColor: '#3786CE',
		'&:hover': {
			color: 'white',
			backgroundColor: '#3DBDFF',
			borderColor: 'black',
			boxShadow: '0 0 0 0.1rem rgba(0,0,0,.4)',
		},
	},
}))(Button)

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		padding: theme.spacing(2),
		paddingLeft: '2em',
		backgroundColor: '#B0021D',
		fontWeight: 500,
		fontFamily: 'Roboto',
		cursor: 'default',
	},
}))

const roomStepper = () => ['Select Cohort', 'Enter Room Name', 'Room Id']

const roomStepperContent = (step, roomId, adminId) => {
	switch (step) {
		case 0:
			return 'Select your cohort.'
		case 1:
			return 'Room name'
		case 2:
			return `Room id: ${roomId} Admin id: ${adminId} `
		default:
			return 'Unknown step'
	}
}

const Home = () => {
	const [roomName, setRoomName] = useState('')
	const [cohortName, setCohortName] = useState('')
	const [roomId, setRoomId] = useState(0)
	const [adminId, setAdminId] = useState(0)
	const [activeStep, setActiveStep] = useState(0)
	const [open, setOpen] = useState(false)
	const [openRoom, setOpenRoom] = useState(false)
	const [openAdmin, setOpenAdmin] = useState(false)
	const [openStudent, setOpenStudent] = useState(false)

	const handleCreateRoom = (e) => {
		e.preventDefault()
		handleModal()
		setActiveStep(0)
		setRoomName('')
		setCohortName('')
		window.localStorage.setItem('ADMIN_ID', adminId)
		window.location.href = `/${roomId}`
	}

	const handleModal = () => {
		setActiveStep(0)
		setRoomName('')
		setCohortName('')
		setOpen(!open)
	}

	const handleAdmin = () => {
		setOpenAdmin(!openAdmin)
		setOpenStudent(false)
	}

	const handleStudent = () => {
		setOpenStudent(!openStudent)
		setOpenAdmin(false)
	}

	const handleJoinRoom = () => {
		setOpenAdmin(false)
		setOpenStudent(false)
		setOpenRoom(!openRoom)
	}

	const generateIds = () => {
		const admin = Math.floor(Math.random() * Math.floor(1234))
		const room = Math.floor(Math.random() * Math.floor(12))

		setRoomId(room)
		setAdminId(admin)
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleRoomName = (e) => setRoomName(e.target.value)
	const handleCohort = (e) => setCohortName(e.target.value)

	const handleNextStep = () => {
		activeStep === 1
			? generateIds()
			: setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}
	const handlePrevStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const steps = roomStepper()
	const classes = useStyles()
	return (
		<div id='home-page' className={classes.root}>
			<AppBar position='static'>
				<Typography variant='h4' component='h3' className={classes.title}>
					Simple QA
				</Typography>
			</AppBar>
			<HomeWrapper>
				<LoginBox>
					<RedColorButton
						variant='outlined'
						color={'secondary'}
						size='large'
						onClick={handleJoinRoom}
					>
						Join a room
					</RedColorButton>
					<img src={homeImg} alt='Question and Answer' />
					<BlueColorButton
						variant='outlined'
						color='primary'
						size='large'
						onClick={handleModal}
					>
						Create a room
					</BlueColorButton>
				</LoginBox>
				<CreateRoom
					openModal={open}
					closeModal={handleModal}
					activeStep={activeStep}
					steps={steps}
					handleSubmit={handleCreateRoom}
					stepContent={roomStepperContent(activeStep, roomId, adminId)}
					nextStep={handleNextStep}
					prevStep={handlePrevStep}
					roomName={roomName}
					setRoom={handleRoomName}
					setCohort={handleCohort}
					cohortName={cohortName}
				/>
				<JoinRoom
					openModal={openRoom}
					closeModal={handleJoinRoom}
					collapseAdmin={handleAdmin}
					collapseStudent={handleStudent}
					openAdmin={openAdmin}
					openStudent={openStudent}
				/>
			</HomeWrapper>
		</div>
	)
}

export default Home
