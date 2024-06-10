import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomCode } = useParams();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    const getRoomDetails = async () => {
      const SERVER = "http://127.0.0.1:8000";
      const response = await fetch(`${SERVER}/api/get-room?code=${roomCode}`);
      const data = await response.json();
      setRoomDetails({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
    };
    getRoomDetails();
  }, [roomCode]);

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {roomDetails.votesToSkip}</p>
      <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
      <p>Host: {roomDetails.isHost.toString()}</p>
    </div>
  );
};

export default Room;
