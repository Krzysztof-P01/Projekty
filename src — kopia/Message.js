import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';
import { forwardRef } from 'react';

const Message = forwardRef(({message,username},ref)=> {
  const isUser= username===message.username;
  const isnotText=message.text==='';
  
    return (
        <div ref={ref} className={`mess-card ${isUser && 'mess_user'}`}>

        <Card >
        <CardContent className={isUser ? "mess-card-user" : "mess-card-anon"}>
        <Typography
          color="white"
          variant="h5"
          component="h2"
        >
        
         <div class="username"> {!isUser && `${message.username || "Anon"}`}</div> {message.text.trim()}
        </Typography>
        </CardContent>
        </Card>
        </div>
    )
})

export default Message
