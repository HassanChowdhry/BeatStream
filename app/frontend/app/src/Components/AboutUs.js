import { useState } from "react";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function AboutUs(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return "<h2>Join Page</h2> <br> Welcome to the Join Page! Here, you can join an exciting music streaming party hosted by your friends or fellow music enthusiasts. To get started, simply enter the unique ROOM code provided by the host. This code grants you access to the party where you can enjoy the playlist curated by the host, interact with other guests, and participate in fun features like voting to skip songs. Experience a collaborative and interactive music listening session like never before. Don't have a ROOM code yet? Reach out to the host to get one and dive into the musical fun!";
  }

  function createInfo() {
    return "<h2>Create Page</h2> <br> Welcome to the Create Page! As the host, you have the power to create a unique music streaming party and share your favorite tunes with friends and guests. Begin by setting up your party and generating a unique ROOM code for guests to join. Customize your party experience by setting permissions for guest control—allow them to vote on skipping songs, or keep the control exclusively in your hands. You can pause or skip any track without needing votes. Create an unforgettable music experience and enjoy the fun of hosting your own music streaming party!";
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h3" variant="h3">
          About Beatstream
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? (joinInfo()) : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}