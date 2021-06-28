import { Card, CardContent, formatMs, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';
import { forwardRef, useEffect, useState } from 'react';
import { ColorPicker, useColor } from "react-color-palette";

const Message = forwardRef(({message,username},ref)=> {
  const isUser= username===message.username;
  const [bc,setBc]=useState('');
 
  useEffect(() => {
    setBc(localStorage.getItem("bc")) ;
  
  },)

  
    return (
        <div  ref={ref} className={`mess-card ${isUser && 'mess_user'}`}>

        <Card>
        <CardContent    style={{'background-color': bc}}     className={isUser ? "mess-card-user" : "mess-card-anon"}>
        <Typography
          color={"white"}
          variant="h5"
          component="h2"
        >
         <div class="username">{!isUser && `${message.username || "Anon"}`}</div> {message.text.trim()}
        </Typography>
        </CardContent>
        </Card>
        </div>
    )
})

export default Message
