//import socketIO from "socket.io-client"
import './App.css';
import Chat from './component/Chat/Chat';
import Join from './component/Join/Join'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

//const ENDPOINT = 'http://localhost:3000';
//const socket = socketIO(ENDPOINT, {transports: ['websocket']})

function App() {

  //socket.on("connect", () => {

  //})

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path = '/' Component={Join} />
        <Route path = '/chat' Component={Chat}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
