import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './components/Message';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, [] ) 

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, input]);
    setInput('');
  }

console.log(username)

  return (
    <div className="App">
      <h1>Hello Clever Programmers!</h1>
      <h2>Welcome {username}</h2>
      <form>
      <FormControl>
        <InputLabel >Enter a message...</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>Send Message</Button>
    </FormControl>
        
      </form>
      {
        messages.map(message => (
         <Message text={message}/>
        ))
      }
    </div>
  );
}

export default App;
