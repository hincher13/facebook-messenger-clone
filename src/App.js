import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './components/Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	const chatRef = useRef(null);

	//this is a listener
	useEffect(() => {
		//run once when the app component loads
		db.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot(snapshot => {
				setMessages(
					snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
				);
			});
	}, []);

	useEffect(() => {
		setUsername(prompt('Please enter your name'));
	}, []);

	useEffect(() => {
		chatRef?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [messages]);

	const sendMessage = event => {
		event.preventDefault();

		db.collection('messages').add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		chatRef.current.scrollIntoView({
			behavior: 'smooth',
		});

		setInput('');
	};

	return (
		<ChatContainer>
			<img src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100' />
			<h1>Messenger App</h1>
			<h2>Welcome {username}</h2>
			<div>
				<FlipMove>
					{messages.reverse().map(({ id, message }) => (
						<Message key={id} username={username} message={message} />
					))}
				</FlipMove>
				<ChatBottom ref={chatRef} />
			</div>
			<ChatInputContainer>
				<form>
					<FormContainer>
						<input
							placeholder='Enter your message...'
							value={input}
							onChange={event => setInput(event.target.value)}
						/>
						<Button type='submit' primary={input} onClick={sendMessage}>
							<SendIcon />
						</Button>
					</FormContainer>
				</form>
			</ChatInputContainer>
		</ChatContainer>
	);
}

export default App;

const ChatContainer = styled.div`
	flex: 0.7;
	flex-grow: 1;
	margin-top: 60px;
	text-align: center;
`;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const ChatInputContainer = styled.div`
	border-radius: 20px;

	> form {
		position: relative;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		margin-left: auto;
		margin-right: auto;
	}

	> form > input {
		position: fixed;
		bottom: 30px;
		width: 90%;
		border-radius: 3px;
		padding: 20px;
		outline: none;
	}

	> form > button {
		position: fixed;
		align-self: flex-end;
		bottom: 30px;
		padding: 20px;
		right: 30px;
		color: #000000;
	}
`;

const FormContainer = styled.div`
	position: fixed;
	padding: 10px;
	bottom: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	width: 60%;
	border: 1px solid #d8d8d8;
	background-color: #ffffff;

	> input {
		width: 90%;
		border-radius: 3px;
		outline: none;
		height: 40px;
		border: none;
		color: #000000;
		font-size: 16px;
		padding: 5px;
	}
`;

const Button = styled.button`
	bottom: 30px;
	color: ${props => (props.primary ? '#2196f3' : 'gray')};
	height: 50px;
	width: 5%;
	padding: 0;
	border: none;
	background-color: #ffffff;

	&:focus {
		border: none;
		outline: none;
	}

	> .MuiSvgIcon-root {
		height: 50px;
		width: 35px;
	}
`;
