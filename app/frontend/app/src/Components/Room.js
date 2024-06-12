import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import SpotifyPlayer from './SpotifyPlayer';

const Room = (props) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotify_auth: false,
  });

  const [song, setSong] = useState({});

  const { roomCode } = useParams();
  const navigate = useNavigate();
  
  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      });
  }
  
  
  const authSpotify = useCallback(async() => {
    fetch('/spotify/is-auth')
      .then((response) => response.json())
      .then((data) => {
        roomDetails.spotify_auth = true;
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url)
            })
            .catch((err) => console.error("Inner" + err))
        }
      })
      .catch((err) => console.error("Outer" + err));
  }, [roomDetails])

  const getRoomDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
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
          if (data.is_host.toString()) {
            console.log("Auth Spotify")
            authSpotify();
          }
          
      }
    } catch (error) {
      console.error(error);
    }

  }, [navigate, roomCode, roomDetails, authSpotify]);

  useEffect(() => {
    getRoomDetails();
  }, []);

  useEffect(() => {
    getCurrentSong();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, []);


  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`/api/leave-room`, requestOptions);
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
    <Grid container spacing={2}>
      {roomDetails.showSettings ? (
        renderSettings()
      ) : (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid xs={12} item align="center">
            <SpotifyPlayer {...song} />
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
