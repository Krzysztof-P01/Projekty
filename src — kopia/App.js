import React,{useState,useEffect} from 'react';
import './App.css';
import {FormControl,InputLabel,Input,Button} from '@material-ui/core/';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import logo from './img/images.jpg';
import send from './img/sen.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
const [input,setInput]=useState('');
const [messages,setMessages]=useState([]);
const [username,setUsername]=useState('');


useEffect(() => {
  // eslint-disable-next-line dot-location
  db.collection('messages').orderBy('date' , "desc").
  onSnapshot(snapshot =>{
    setMessages(snapshot.docs.map(doc =>({id:doc.id , message:doc.data()})))
  })
  
  }, [])


useEffect(() => {
setUsername(prompt('Podaj nazwe'))

}, [])


  const sendMessage = (event) =>{
    event.preventDefault();

    db.collection('messages').add({
      text: input,
      username: username,
      date: firebase.firestore.FieldValue.serverTimestamp()

    })

    setInput('');
  }
  return (
    <div className="App">
<div className="baner">
<div class="title"><h3>Messenger +1 chromosom</h3></div>
<img src={logo} alt="papaj"></img>
</div>
<FlipMove>
{
  messages.map(({id,message})=>(
    <Message key={id} username={username} message={message} />
  ))
}
</FlipMove>



<form className="textform">

<FormControl className="app-textform" >

  <InputLabel >Napisz wiadomość</InputLabel>
  <Input className="iconinput" value={input} onChange={event => setInput(event.target.value)} />
  <button className="iconbutton" disabled={!input.trim()} variant="contained" color="primary" type="submit" onClick={sendMessage}>
  <img src={send} width="50px" height="50px" alt="papaj"/></button>
</FormControl>


    
</form>
    

    </div>
  );
}

export default App;
