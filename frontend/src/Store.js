import React, { createContext, useReducer, useEffect } from 'react';
import io from 'socket.io-client';

export const CTX = createContext();

/*
    quest {
        from: 'user' || 'Annonymous'
        msg: 'hi'
        answers: [{answer}, {answer}]
    }
    state {
        room1: [
            {quest}, {quest}
        ]
        room2: [
            {quest}, {quest}
        ]
    }
*/

function reducer(state, action) {
	const {
		from,
		question,
		upvotes,
		answers,
		room,
		_id,
		createdAt,
	} = action.payload;
	switch (action.type) {
		case 'RECEIVE_QUESTION':
			return {
				...state,
				[room]: [
					...state[room],
					{
						from,
						question,
						upvotes,
						answers,
						room,
						createdAt,
						_id,
					},
				],
			};
		case 'UPDATE_QUESTION':
			const updatedQues = state[room].map((ques) => {
				if (ques._id === _id) {
					return action.payload;
				}

				return ques;
			});
			return {
				...state,
				[room]: [...updatedQues],
			};
		case 'RECEIVE_ALL_QUESTIONS':
			return {
				...state,
				[action.payload[0]]: [...action.payload[1]],
			};
		default:
			return state;
	}
}

let socket;

function sendQuestionAction(value) {
	socket.emit('question', value);
}

function sendUpvoteAction(value) {
	socket.emit('upvote', value);
}

function sendAnswerAction(value) {
	socket.emit('answer', value);
}

export default function Store(props) {
	const initState = {
		// r123: [
		// {
		// 	from: 'James',
		// 	question: 'How can I do that?',
		// 	upvotes: 0,
		// 	comments: [],
		//     room: 'room0',
		//     id: 0
		// },
		// {
		// 	from: 'Geoff',
		// 	question: "You can't",
		// 	upvotes: 10,
		// 	comments: [],
		//     room: 'room0',
		//     id: 1
		// },
		// ],
	};

	const [rooms, dispatch] = useReducer(reducer, initState);

	if (!socket) {
		socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

		socket.emit('subscribe', `${props.location.pathname.slice(1)}`);
		socket.on('question', (question) => {
			console.log(question);
			dispatch({ type: 'RECEIVE_QUESTION', payload: question });
		});

		socket.on('upvote', (question) => {
			dispatch({ type: 'UPDATE_QUESTION', payload: question });
		});

		socket.on('answer', (question) => {
			dispatch({ type: 'UPDATE_QUESTION', payload: question });
		});
	}

	useEffect(() => {
		(async () => {
			try {
				const room = `${props.location.pathname.slice(1)}`;
				const res = await fetch(
					`http://${process.env.REACT_APP_BACKEND_URL}/${room}`,
					{}
				);

				const questions = await res.json();
				const payload = [`${props.location.pathname.slice(1)}`, questions];
				dispatch({ type: 'RECEIVE_ALL_QUESTIONS', payload });
			} catch (e) {
				console.error(e);
			}
		})();
	}, [props.location.pathname]);

	return (
		<CTX.Provider
			value={{ rooms, sendQuestionAction, sendUpvoteAction, sendAnswerAction }}
		>
			{props.children}
		</CTX.Provider>
	);
}
