import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyRounded';
import HighlightOutlinedIcon from '@material-ui/icons/HighlightOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		//-------------favorite icon color
		primary: {
			//red
			main: '#d50000',
		},
		//-------------highlighted icon color------------------
		secondary: {
			//yellow
			main: '#f57c00',
		},
	},
});

const useStyles = makeStyles((theme) => ({
	iconButtons: {
		favorite: { paddingBottom: '0px' },
		highlighted: { paddingBottom: '6px' },
		delete: {
			paddingRight: '6px',
		},
	},
}));

function HoverIconButtons(props) {
	const adminId = window.localStorage.getItem('ADMIN_ID');
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			{/* ------------------------------ favorite button--------------------------*/}
			<IconButton
				id={props.favoriteId}
				onClick={props.toggleFavorite}
				className={classes.iconButtons.favorite}
				color={props.redHighlight ? 'primary' : 'default'}
				size='small'
			>
				<FavoriteBorderOutlinedIcon
					fontSize='small'
					style={{ paddingBottom: '0px' }}
				/>
			</IconButton>

			{/* ------------------------------ highlighted button--------------------------*/}
			{adminId && (
				<IconButton
					id={props.highlighted}
					onClick={props.toggleHighlighted}
					size='small'
					color={props.yellowHighlight ? 'secondary' : 'default'}
					className={classes.iconButtons.highlighted}
				>
					<HighlightOutlinedIcon style={{ paddingTop: '0px' }} />
				</IconButton>
			)}
			{props.highlighted && (
				<IconButton
					id={props.highlighted}
					onClick={props.toggleHighlighted}
					size='small'
					color={props.yellowHighlight ? 'secondary' : 'default'}
					className={classes.iconButtons.highlighted}
				>
					<HighlightOutlinedIcon style={{ paddingTop: '0px' }} />
				</IconButton>
			)}

			{/* ------------------------------ reply button and dialog component--------------------------*/}
			<IconButton
				id={props.replyId}
				onClick={props.toggleReplyModal}
				size='small'
			>
				<ReplyOutlinedIcon />
			</IconButton>

			{/* ------------------------------ delete button --------------------------*/}
			{adminId && (
				<IconButton
					id={props.deleteId}
					onClick={props.toggleDelete}
					size='small'
					className={classes.iconButtons.delete}
				>
					<HighlightOffIcon fontSize='small' />
				</IconButton>
			)}
		</ThemeProvider>
	);
}

export default HoverIconButtons;
