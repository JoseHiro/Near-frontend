import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {AiOutlineSend} from 'react-icons/ai';
import { getAuthToken } from '../../../Auth/auth';
// import TextField from '@mui/material/TextField';
import './message.css';

// const socket = io('http://localhost:8080');

function  Message() {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState('');
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState([])
  const [chatroomId, setChatroomId] = useState('6467e45da053d67cee5f1b44')
  const [typingTimeOut, setTypingTimeOut] = useState(null)
  const {recieverId} = useParams();

  console.log(chat);

  const senderToken = getAuthToken();
  useEffect(() => {

    const getChatroom = async () => {
      const response = fetch('http://localhost:8080/chat/' + recieverId, {
        headers: {
          'Authorization' : 'Bearer ' + senderToken
        }
      })
    }

    getChatroom();

  },[])

  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  },[])

  useEffect(() => {
    if(!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, sender: false }]);
    })

    socket.on('typing-from-server', () => setTyping(true))
    socket.on('typing-stopped-from-server', () => setTyping(false))

  }, [socket])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await fetch('http://localhost:8080/message/post', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + senderToken
    //   },
    //   body :JSON.stringify({
    //     message: message,
    //     chatroomId: chatroomId
    //   })
    // })

    const currentData = new Date();
    const currentHour = currentData.getHours();
    const currentMinute = currentData.getMinutes();

    socket.emit('send-message', { message: message, recieverId: recieverId, time: `${currentHour}:${currentMinute}` });
    setChat((prev) => [...prev, {message: message, sender: true }]);
    setMessage('');
  }

  const handleInput = (e) => {
    setMessage(e.target.value);

    socket.emit('typing');

    if(typingTimeOut) clearTimeout(typingTimeOut);
    setTypingTimeOut(
      setTimeout(() => {
      socket.emit('typing-stopped')
    }, 200));
  }

  return (
    <div className="chat_box">
      <div className='chat_box_message'>
        { chat.map((data, index) => (
          <div className={(data.sender)? 'sender_message' : 'reciever_message'}>
            {(!data.sender) && <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>}
            <p key={index}>{data.message}</p>
          </div>
        ))
        }

        {/* <div className='sender_message'>
          <div>
            <p className="message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five c</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>

        <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div> */}

        {/* <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div>

        <div className='sender_message'>
          <div>
            <p className="message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five c</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>

        <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div>

        <div className='sender_message'>
          <div>
            <p className="message">Lorem</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>
        <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div>

        <div className='sender_message'>
          <div>
            <p className="message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five c</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>

        <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div>

        <div className='sender_message'>
          <div>
            <p className="message">Lorem</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>
        <div className='sender_message'>
          <div>
            <p className="message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five c</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div>

        <div className='reciever_message'>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
          <div>
            <p className="message">Hello there!</p>
            <time>10:20</time>
          </div>
        </div>

        <div className='sender_message'>
          <div>
            <p className="message">Lorem</p>
            <time>10:20</time>
          </div>
          <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
        </div> */}


      </div>
      {
        typing &&
        <p>User is typing....</p>
      }
      <form onSubmit={handleSubmit} className="message_form">
        <input placeholder="type a message.." value={message} onChange={handleInput}/>
        <button type='submit'><AiOutlineSend/></button>
      </form>
    </div>
  )
}

export default  Message
