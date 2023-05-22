import React, {useState} from 'react'
import './Join.css'
import { Link } from 'react-router-dom'

let user;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}

const Join = () => {

const [name, setName] = useState("");

  return (
   <div className='JoinPage'>
    <div className='JoinContainer'>
        <h1>Wassup</h1>
        <input onChange = {(e) => setName(e.target.value)} placeholder='Enter your name here' type='text' id = 'joinInput'/>
       <Link onClick={(e) => !name ? e.preventDefault() : null} to={'/chat'} ><button onClick={sendUser} className='joinBtn'> Join Wassup!! </button> </Link>
    </div>
   </div>
  )
}

export default Join
export {user}
