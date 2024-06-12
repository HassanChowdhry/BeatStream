import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const SpotifyPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  const play_song = () => {
    const req = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", req)
  }

  const pause_song = () => {
    const req = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", req)
  }

  const skip_song = () => {
    const req = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", req)
  }

  const prev_song = () => {
    const req = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/prev", req)
  }
  

  return (
    <Card style={{backgroundColor: "#191414", color: "#fff"}}>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={props.image_url} height="100%" width="100%" alt="Album Art" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h4" variant="h4">
            {props.title}
          </Typography>
          
          <Typography component="h6" variant="h6">
            {props.artist}
          </Typography>
          
          <div>
            <IconButton style={{color: "#fff"}} onClick={() => prev_song()}>
              <SkipPreviousIcon  />
            </IconButton>
            <IconButton style={{color: "#fff"}} onClick={() => {props.is_playing ? pause_song(): play_song()}}>
              {props.is_playing ? <PauseIcon /> : <PlayArrowIcon  />}
            </IconButton>
            <IconButton style={{color: "#fff"}} onClick={() => skip_song()}>
              <SkipNextIcon  /> 
            </IconButton>
          </div>
          
          <Typography component="h6" variant="h6">
            {`${props.votes} /  ${props.votes_required}`}
          </Typography>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default SpotifyPlayer;
