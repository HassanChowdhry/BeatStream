import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import RoomJoin from './Components/RoomJoin'
import CreateRoom from './Components/CreateRoom'
import Room from './Components/Room'
import './App.css';

function App() {
  return (
    <div id='gradient'>
    <div id='main'>
    <div id='app'>
    <div className='center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<RoomJoin />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
