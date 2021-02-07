import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import style from './MessageList.module.css';

const MessageList = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div
      className={`${style.message} ${isUser && style.message_user}`}
      ref={ref}
    >
      <Card
        variant="outlined"
        classes={{
          root: isUser ? style.message_user_card : style.message_guest_card,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {!isUser && `${message.username}:`} {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default MessageList;
