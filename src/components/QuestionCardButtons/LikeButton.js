import React from 'react';
import { HiThumbUp } from 'react-icons/hi';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
		expand: {
			paddingTop: '10px',
			alignSelf: 'flex-end',
		},
	},
}));

function LikeButton(props) {
	const classes = useStyles();
	const replyArray = [...props.replies.admin, ...props.replies.student];
	return (
		<div className={classes.replyAndLike}>
			<Button
				size='small'
				className={classes.likeButton}
				onClick={props.increment}
				style={replyArray.length ? { paddingBottom: '0px' } : {}}
			>
				<span>{props.upVotes}</span>
				<HiThumbUp size='18px' style={{ margin: '0px 0px 4px 10px' }} />
			</Button>
			{replyArray.length > 0 && (
				<Button
					id={props.buttonId}
					size='small'
					color='inherit'
					component='button'
					onClick={props.openReplies}
					className={classes.likeButton.expand}
					style={
						replyArray.length > 1
							? {
									paddingLeft: '0px',
									right: '20px',
									textTransform: 'none',
							  }
							: { textTransform: 'none' }
					}
				>
					<Typography style={{ fontSize: '12px', fontWeight: 'bold' }}>
						{replyArray.length < 2
							? `${replyArray.length} Reply`
							: `${replyArray.length} Replies`}
					</Typography>
				</Button>
			)}
		</div>
	);
}

export default LikeButton;
