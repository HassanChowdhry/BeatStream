import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CreateRoom from './CreateRoom';

const Room = (props) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
  });
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const SERVER = "http://127.0.0.1:8000"

  useEffect(() => {
    getRoomDetails();
  });

  const getRoomDetails = async () => {
    try {
      const response = await fetch(`${SERVER}/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        // props.leaveRoomCallback();
        navigate('/');
      } else {
        const data = await response.json();
        setRoomDetails({
          ...roomDetails,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`${SERVER}/api/leave-room`, requestOptions);
      // props.leaveRoomCallback();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const updateShowSettings = (value) => {
    setRoomDetails({ ...roomDetails, showSettings: value });
  };

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoom
          update={true}
          votesToSkip={roomDetails.votesToSkip}
          guestCanPause={roomDetails.guestCanPause}
          roomCode={roomCode}
          updateCallback={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      {roomDetails.showSettings ? (
        renderSettings()
      ) : (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Votes: {roomDetails.votesToSkip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Guest Can Pause: {roomDetails.guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Host: {roomDetails.isHost.toString()}
            </Typography>
          </Grid>
          {roomDetails.isHost && renderSettingsButton()}
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Room;
