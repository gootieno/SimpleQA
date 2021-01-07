import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { CTX } from '../Store';
import { Card, Button, Typography, CardContent } from '@material-ui/core';
import DeleteCard from './DialogModals/DeleteCardModal';
import ReplyModal from './DialogModals/ReplyModal';
import HoverIconButtons from './QuestionCardButtons/HoverIconButtons';
import LikeButton from './QuestionCardButtons/LikeButton';
import AnsweredQuestions from './DialogModals/AnsweredQuestions';

const QuestionCardWrapper = styled.div`
	margin: 20px 0;

	.MuiCardContent-root {
		background-color: #f5f5f5;
		padding-bottom: 4px;
	}

	#favorite {
		padding-bottom: 0px;
	}

	#highlighted {
		padding-bottom: 4px;
	}

	#delete-question:hover {
		color: #d50000;
	}

	#expand {
		left: 7px;
		color: #3f51b5;
		font: 5px;
	}

	#expanding-question:hover {
		cursor: pointer;
	}

	#reply {
		autofocus: true;
	}
`;

//--------------------------------------------- theme for material icon colors --------------------

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
//-------------------------------------------------------------------------------------------------

//-------------------------------------------- class styling for componenets ----------------------

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		minHeight: '80vh',
		maxHeight: '80vh',
	},
	root: {
		position: 'relative',
		minWidth: 275,
	},
	topHalf: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: '0px',
	},
	bottomHalf: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	bottomHalfContent: {
		paddingBottom: '22px',
		maxWidth: '28em',
		fontWeight: 'normal',
	},
	replyContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	deleteModal: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	iconButtons: {
		favorite: { paddingBottom: '0px' },
		highlighted: { paddingBottom: '6px' },
		delete: {
			paddingRight: '6px',
		},
		expand: {
			paddingTop: '10px',
			alignSelf: 'flex-end',
		},
	},
	replyAndLike: {
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: '16px',
	},
	likeButton: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingRight: '0px',
	},
	actionButtons: { marginLeft: '.4rem', bottom: '.4rem' },
}));

const QuestionCard = ({ question }) => {
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);
	const [button, setButton] = useState({
		favorite: false,
		highlighted: false,
	});
	const [replies, setReplies] = useState({ admin: [], student: [] });
	const [replyValue, setReplyValue] = useState('');
	const [openReplies, setOpenReplies] = useState(false);

	const adminId = window.localStorage.getItem('ADMIN_ID');

	//------------------------------------- reply button and dialog component actions ------------
	const handleDialog = () => {
		setOpen(!open);
		setReplyValue('');
		setShow(false);
	};

	const toggleReply = () => {
		setOpen(!open);
	};

	const handleSubmit = (e) => {
		//send the reply array to database
		const { admin, student } = replies;
		e.preventDefault();
		adminId
			? setReplies({ ...replies, admin: [...admin, replyValue] })
			: setReplies({ ...replies, student: [...student, replyValue] });

		console.log(replies);

		setReplyValue('');

		setOpen(false);
	};

	const handleReplyChange = (e) => {
		setReplyValue(e.target.value);
	};

	const openAnsweredQuestions = () => {
		setOpenReplies(!openReplies);
	};

	//--------------------------------------------------------------------------------------------

	//------------------------------------- reducer and socket actions for question card changes--
	const { sendUpvoteAction } = useContext(CTX);

	const handleIncrement = () => {
		const updatedQuestion = { ...question, upvotes: question.upvotes + 1 };
		sendUpvoteAction(updatedQuestion);
	};
	//--------------------------------------------------------------------------------------------

	//--------------------------------------- icon button actions ---------------------------------
	const handleFavoriteIcon = () => {
		const { favorite } = button;
		setButton({ ...button, favorite: !favorite });
	};

	const handleHighlightedIcon = () => {
		const { highlighted } = button;
		setButton({ ...button, highlighted: !highlighted });
	};

	const handleDelete = () => {
		//do some code to delete question from database
		setDeleteModal(false);
	};
	//--------------------------------------------------------------------------------------------
	let firstPart = question.question.slice(0, 195);

	const classes = useStyles();
	return (
		<QuestionCardWrapper>
			<Card
				className={classes.root}
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				<CardContent>
					<div className={classes.topHalf}>
						<Typography
							style={{ marginBottom: '1.7em' }}
							color='textSecondary'
							gutterBottom
						>
							{question.from || `Annonymous`}
						</Typography>

						<div className={classes.actionButtons}>
							{show && (
								<HoverIconButtons
									favoriteId='favorite'
									highLightedId='highlighted'
									replyId='reply'
									deleteId='delete-question'
									toggleFavorite={handleFavoriteIcon}
									redHighlight={button.favorite}
									toggleHighlighted={handleHighlightedIcon}
									yellowHighlight={button.highlighted}
									toggleReplyModal={toggleReply}
									toggleDelete={() => setDeleteModal(true)}
									hoverEffect={show}
								/>
							)}

							<ReplyModal
								closeModal={handleDialog}
								openModal={open}
								question={question.question}
								replyValue={replyValue}
								replyChange={handleReplyChange}
								cancel={handleDialog}
								cancelColor='primary'
								submit={handleSubmit}
							/>

							<DeleteCard
								openModal={deleteModal}
								closeModal={() => deleteModal}
								cancel={() => setDeleteModal(false)}
								deleteCard={handleDelete}
							/>
						</div>
					</div>
				</CardContent>
				<CardContent style={{ paddingTop: '0px' }}>
					<div className={classes.bottomHalf}>
						{question.question.length < 195 ? (
							<Typography
								variant='h6'
								component='h2'
								className={classes.bottomHalfContent}
							>
								{question.question}
							</Typography>
						) : (
							<Typography
								id='expanding-question'
								onClick={() => setOpen(true)}
								variant='h6'
								component='h2'
								className={classes.bottomHalfContent}
							>
								{`${firstPart}...`}
							</Typography>
						)}
						<LikeButton
							increment={handleIncrement}
							replyLength={replies.length}
							replies={replies}
							upVotes={question.upvotes}
							openReplies={openAnsweredQuestions}
							buttonId='expand'
						/>
						<AnsweredQuestions
							openReplies={openReplies}
							closeReplies={openAnsweredQuestions}
							replies={replies}
						/>
					</div>
				</CardContent>
			</Card>
		</QuestionCardWrapper>
	);
};

export default QuestionCard;
