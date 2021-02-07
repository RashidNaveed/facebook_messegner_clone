import React, { useEffect, useState } from 'react';
import {
  Grid,
  FormControl,
  Input,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import MessageList from '../MessagesList/MessageList';
import db from '../../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import style from './HomePage.module.css';

const HomePage = () => {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setMessage(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        )
      );
  }, []);

  useEffect(() => {
    setUsername(prompt('Enter Your Name'));
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={style.homepage}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <img
          src="https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk"
          alt="Messenger Clone"
          width="100px"
          height="100px"
        />
        <Typography variant="h5" component="h2" color="primary">
          Messenger Clone
        </Typography>
        <form onSubmit={sendMessage} className={style.homepage_input_form}>
          <FormControl className={style.homepage_form_control}>
            <Input
              className={style.form_control_input}
              placeholder="Write Message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className={style.form_control_button}
              variant="contained"
              color="primary"
              disabled={!input}
              type="submit"
            >
              <Send />
            </IconButton>
          </FormControl>
        </form>
      </Grid>
      <Grid item className={style.message_list}>
        <FlipMove>
          {message.map(({ data, id }) => (
            <MessageList username={username} message={data} key={id} />
          ))}
        </FlipMove>
      </Grid>
    </Grid>
  );
};

export default HomePage;
