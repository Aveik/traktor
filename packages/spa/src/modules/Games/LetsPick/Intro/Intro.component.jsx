import {
  Box as MuiBox,
  Button as MuiButton,
  InputAdornment as MuiInputAdornment,
  TextField as MuiTextField,
} from '@material-ui/core';
import {
  Keyboard as KeyboardIcon,
  MeetingRoom as RoomIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Intro({ onCreate, onJoin }) {
  const [state, setState] = useState('');

  function handleChange({ target: { value } }) {
    setState(value);
  }

  function handleJoin() {
    onJoin(state);
    setState('');
  }

  return (
    <MuiBox
      alignItems='center'
      display='flex'
      height='100%'
      justifyContent='center'
    >
      <MuiBox mr={1}>
        <MuiButton
          color='secondary'
          onClick={onCreate}
          startIcon={<RoomIcon />}
          variant='contained'
        >
          New room
        </MuiButton>
      </MuiBox>

      <MuiBox mr={1}>
        <MuiTextField
          InputProps={{
            startAdornment: (
              <MuiInputAdornment position='start'>
                <KeyboardIcon />
              </MuiInputAdornment>
            ),
          }}
          onChange={handleChange}
          placeholder='Enter room code'
          size='small'
          value={state}
          variant='outlined'
        />
      </MuiBox>

      <MuiButton color='secondary' disabled={!state} onClick={handleJoin}>
        Join
      </MuiButton>
    </MuiBox>
  );
}

Intro.propTypes = {
  onJoin: PropTypes.func.isRequired,
};

export default Intro;
