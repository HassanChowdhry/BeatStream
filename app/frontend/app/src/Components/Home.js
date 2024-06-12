import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@mui/material'; // Updated package name
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
  const [roomCode, setRoomCode] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomCode = async () => {
      // const SERVER = "http://127.0.0.1:8000"
      const response = await fetch(`/api/user-in-room`);
      const data = await response.json();
      setRoomCode(data.code);
    };
    fetchRoomCode();
  }, [location]);

  useEffect(() => {
    if (roomCode) {
      navigate(`/room/${roomCode}`)
    }
  }, [roomCode, navigate])

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} align="center">
      <Typography variant="h3" compact="h3">
        Beatstream
      </Typography>
    </Grid>
    <Grid item xs={12} align="center">
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button color="primary" to="/join" component={Link}>
          Join a Room
        </Button>
        <Button color="secondary" to="/create" component={Link}>
          Create a Room
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
  )
};

export default Home;