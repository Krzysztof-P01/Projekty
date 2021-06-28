import React,{useState,useEffect} from 'react';
import './App.css';
import {FormControl,InputLabel,Input, Button} from '@material-ui/core/';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Icon} from '@iconify/react';
import latinCross from '@iconify-icons/emojione-monotone/latin-cross';
import Modal from 'react-modal';
// npm install --save-dev @iconify/react @iconify-icons/bytesize
import { InlineIcon } from '@iconify/react';
import settingsIcon from '@iconify-icons/bytesize/settings';
// npm install --save-dev @iconify/react @iconify-icons/ic
import baselineChangeCircle from '@iconify-icons/ic/baseline-change-circle';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

Modal.setAppElement('#root');
const dziwka =true

class Kutas extends React.Component{
    render(){
      return(
<div>hello</div>
      )
    }
  }

function App() {
const [input,setInput]=useState('');
const [messages,setMessages]=useState([]);
const [channel,setChannel]=useState('');
const [channel_pass,setChannel_pass]=useState('');
const [username,setUsername]=useState('');
const [username_tmp,setUsername_tmp]=useState('');
const [modal_settings,setModal_settings]=useState(false);
const [modal_color,setModal_color]=useState(false);
const err = input.length>=500;
const [bc,setBc]=useState('');
const [color, setColor] = useColor("hex", bc);
const isMain= channel==='Ogólny';
let collection=channel+"-"+channel_pass;
if(collection==="-"){
   collection='Ogólny';
}
// firebase firestore:delete --all-collections --project clony1337-2137//
useEffect(() => {
            
              db.collection(collection).orderBy("date")
              .onSnapshot(snapshot =>{
              setMessages(snapshot.docs.map(doc =>({id:doc.id , message:doc.data()})))
              })
              
              }, [channel,channel_pass])

            useEffect(() => {
              const nick= localStorage.getItem("username");
              if (nick){
                setUsername(nick);}
            else{
              setModal_settings(true);
              setInput('');
            }

            },[input])

            useEffect(() => {
              localStorage.setItem("username",username);
              }, [username])
             
           
            useEffect(() => {
            window.scrollTo({top:10000000,behavior:"smooth"});
              
              }, [input,messages])
             
              useEffect(() => {
                if(color.hex!="#000000")
                localStorage.setItem("bc",color.hex);
                else if (!localStorage.getItem("bc"))
                {
                  localStorage.setItem("bc","#ffd700"); 
                }
                },)

               
 
                useEffect(() => {
                  setBc(localStorage.getItem("bc")) ;
                 
              
                },[])
               



  const sendMessage = (event) =>{
    event.preventDefault();

    db.collection(collection).add({
      text: input,
      username: username,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('');
  }


  return (
    
    <div className="App">
<div className="baner">
<div class="title"><h1>KATOLICKI KOMUNIKATOR TEKSTOWY</h1><Kutas></Kutas>
<h3>{username}, Jezus cie kocha..<div className="baner2"><Icon onClick={()=>setModal_settings(!modal_settings)}  width="1.5rem" icon={settingsIcon} /></div></h3> 
</div>
</div>
<div className="main">

      <Modal  className="settings" isOpen={modal_settings} onRequestClose={()=>setModal_settings(false)}>
<FormControl >
        
<div className="settings_username">
<InputLabel > nazwa użytkownika:</InputLabel>
<Input error={username.length>=20} value={username_tmp}  placeholder={username}  onChange={event => setUsername_tmp(event.target.value)}/>
<button disabled={!username_tmp.trim()||username_tmp.length>=20}  onClick={()=>setUsername(username_tmp)}><Icon width="2rem" icon={baselineChangeCircle} /></button>
</div>
<Button onClick={()=>setModal_color(true)}  variant="contained" color="primary" disableElevation>

Zmiana koloru czatu
</Button>
</FormControl>
      <Modal  className="color" isOpen={modal_color} onRequestClose={()=>setModal_color(false)}>
<ColorPicker  width={200} height={200} color={color} onChange={setColor} hideHSV dark />  
      </Modal>
      <div className="settings_channel">
<Input type="text" placeholder="Kanał" value={channel} onChange={event => setChannel(event.target.value)}></Input>
<Input type="password" placeholder="Hasło" className={isMain ? "input-pass-main" : "input-pass-custom"} value={channel_pass} onChange={event => setChannel_pass(event.target.value)}></Input>
</div>
<button className="button_settings" onClick={()=>setModal_settings(false)}>Zamknij</button>
    </Modal>

<FlipMove >

{ 
 
  messages.map(({id,message})=>(
    <Message  key={id} username={username} message={message} />
  ))

}
</FlipMove>

</div>
<footer>

<form className="textform">

<FormControl className="app-textform" >
  <InputLabel >Napisz wiadomość</InputLabel>
  <Input error={input.length>=500} className="iconinput" value={input} onChange={event => setInput(event.target.value)} />
  <button className="iconbutton" disabled={!input.trim()||err} variant="contained" color="primary" type="submit" onClick={sendMessage}>
  <Icon icon={latinCross} /></button>
</FormControl>


    
</form>
   </footer> 
   <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT&display=swap" rel="stylesheet"/> 
    </div>
  );
}

export default App;