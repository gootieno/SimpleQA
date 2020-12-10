import React, { useState, useContext } from "react";
import styled from "styled-components";
import Feed from "./Feed";
import NavBar from "./NavBar";
import Collapse from "@material-ui/core/Collapse";
import Button from "../styles/Button";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { CTX } from "../Store";

const RoomWrapper = styled.div`
	display: flex;
	flex-flow: column;
	margin: auto;
	width: 100%;
	margin-top: 50px;

	@media screen and (min-width: 700px) {
		width: 700px;
	}
`;

const QuestionSubmit = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	Button {
		margin: 0.3rem 0 0.1rem 0.5rem;
	}
`;

const Room = (props) => {
	// local state
	const [clicked, setClicked] = useState(false);
	const [question, setQuestion] = useState({
		question: "",
		from: "",
	});

	// CTX Store
	const { rooms, sendQuestionAction } = useContext(CTX);
	const questions = rooms[`${props.location.pathname.slice(1)}`];

	const handleClick = () => setClicked(true);
	const handleClickAway = () => setClicked(false);

	const handleChange = (e) => {
		setQuestion({
			...question,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = () => {
		sendQuestionAction({
			...question,
			upvotes: 0,
			answers: [],
			room: `${props.location.pathname.slice(1)}`,
			createdAt: new Date(),
		});
		setQuestion({ question: "", from: "" });

		setClicked(false);
	};

	return (
		<>
			<NavBar />
			<RoomWrapper>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div>
						<TextField
							id="full-width-text-field"
							name="question"
							label="Enter Question Here"
							onClick={handleClick}
							onChange={handleChange}
							multiline
							variant="outlined"
							value={question.question}
							style={{ width: '100%', marginTop: 5, marginBottom: 2 }}
						/>
						<Collapse timeout={500} in={clicked}>
							<QuestionSubmit>
								<TextField
									id="standard-basic"
									name="from"
									value={question.from}
									onChange={handleChange}
									variant="outlined"
									placeholder="Your name (optional)"
									style={{ width: "100%", paddingTop: 5 }}

								/>
								<Button onClick={handleSubmit}>Submit</Button>
							</QuestionSubmit>
						</Collapse>
					</div>
				</ClickAwayListener>
				<div style={{ margin: '20px 0' }}></div>
				{questions ? <Feed questions={questions} /> : ''}
			</RoomWrapper>
		</>
	);
};

export default Room;
