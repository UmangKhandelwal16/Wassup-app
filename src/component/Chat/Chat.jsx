import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import { io } from 'socket.io-client';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

let socket;

const ENDPOINT = "http://localhost:3000/";

const Chat = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState([])


  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert("connected");
      setId(socket.id);
    });

    console.log(socket);
    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessage ([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on('userJoined', (data) => {
      setMessage ([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on('leave', (data) => {
      setMessage ([...message, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit('disconnectEvent'); // Change the event name here
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessage ([...message, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      // Clean up any event listeners or resources here
      socket.off()
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Wassup</h2>
          <IconButton aria-label="delete" color='white'>
          <a href = '/'> <CloseIcon /> </a> 
          </IconButton>
        </div>
        <ReactScrollToBottom className="chatBox">
          {message.map((item, i)=> <Message user = {item.id===id?'':item.user} message={item.message} classs = {item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type='text' id="chatInput" />
          <button onClick={send} className="sendBtn"><SendIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;



// import React, { useEffect, useState } from 'react'
// import { user } from '../Join/Join'
// import socketIo from 'socket.io-client';
// import './Chat.css'
// import SendIcon from '@mui/icons-material/Send';

// let socket;

// const ENDPOINT = "http://localhost:3000/";

// const Chat = () => {
// const [id, setId] = useState("")

// const send = () => {
//  const message = document.getElementById('chatInput').value;
//   socket.emit('message', {message, id});
//   document.getElementById('chatInput').value = "";
// }

//   useEffect(() => {
//     const socket = socketIo(ENDPOINT, { transports: ['websocket'] });

//     socket.on('connect', () => {
//       alert("connected");
//       setId(socket.id);
//     })

//     console.log(socket);
//     socket.emit('joined', {user})
    
//     socket.on('welcome', (data) => {
//       console.log(data.user, data.message);
//     })
  
//     socket.on('userJoined', (data) => {
//       console.log(data.user, data.message);
//     })

//     socket.on('leave', (data) => {
//       console.log(data.user, data.message);
//     })

//     return () => {
//       socket.emit('disconnect');
//       socket.off();
//     }
//   }, [])

// useEffect(() => {
//   socket.on('sendMessage', (data) => {
//     console.log(data.user, data.message, data.i)
//   })
//   return () => {
    
//   }
// }, [])

//   return (
//     <div className="chatPage">
//       <div className="chatContainer">
//         <div className="header"></div>
//         <div className="chatBox"></div>
//         <div className="inputBox">
//           <input type='text' id="chatInput"/>
//           <button onClick = {send} className="sendBtn"><SendIcon/></button>
//         </div>
//       </div>
//     </div>
//   )
// } 

// export default Chat;



