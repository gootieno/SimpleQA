import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
}));

const Feed = ({ questions }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);

  if (!value) {
    questions.sort((a, b) => b.upvotes - a.upvotes);
  } else {
    questions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }


	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			{questions.length > 0 ? (
				<div className={classes.root}>
					<AppBar position='static' color='default'>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor='primary'
							textColor='primary'
							variant='fullWidth'
						>
							<Tab label='Popular' {...a11yProps(0)} />
							<Tab label='Recent' {...a11yProps(1)} />
							<Tab label='Archived' {...a11yProps(2)} />
						</Tabs>
					</AppBar>

					<TabPanel value={value} index={0} dir={theme.direction}></TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
					<TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
				</div>
			) : (
				''
			)}
			<div>
				{questions.map(question => (
					<QuestionCard key={question._id} question={question} />
				))}
			</div>
		</>
	);
};

export default Feed;
