import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {AiOutlineSend} from 'react-icons/ai';
import { getAuthToken } from '../../../Auth/auth';
import './message.css';

function  Message() {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState('');
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState([]);
  const [chatroomId, setChatroomId] = useState('');
  const [typingTimeOut, setTypingTimeOut] = useState(null)
  const {recieverId} = useParams();

  const senderToken = getAuthToken();

  useEffect(() => {
    const getChatroom = async () => {
      const response = await fetch('http://localhost:8080/chat/' + recieverId, {
        headers: {
          'Authorization' : 'Bearer ' + senderToken
        }
      })

      const resData = await response.json();

      setChatroomId(resData.chatroomId);
      setChat(resData.chat);
    }
    if(recieverId) getChatroom();
  },[])

  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  },[])

  useEffect(() => {
    if(!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, sender: false, time: data.time }]);
    })

    socket.on('typing-from-server', () => setTyping(true));
    socket.on('typing-stopped-from-server', () => setTyping(false));

  }, [socket])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentData = new Date();
    const currentHour = currentData.getHours();
    const currentMinute = currentData.getMinutes();

    await fetch('http://localhost:8080/message/post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + senderToken
      },
      body: JSON.stringify({
        message: message,
        chatroomId: chatroomId,
        time: `${currentHour}:${currentMinute}`
      })
    })

    socket.emit('send-message', { message: message, recieverId: recieverId, time: `${currentHour}:${currentMinute}` });
    setChat((prev) => [...prev, {message: message, sender: true, time: `${currentHour}:${currentMinute}` }]);
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

  if(!chatroomId) return (<div className="empty_chat_box"></div>)
  return (
    <div className="chat_box">
      <div className='chat_box_message'>
        { chat.map((data, index) => (
          <div key={index} className={(data.sender)? 'sender_message' : 'reciever_message'}>
            {(!data.sender) && <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>}
            <div>
              <p className="message">{data.message}</p>
              {/* <time>{data.time}</time> */}
            </div>
            {(data.sender) && <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>}
          </div>
        ))
        }

      </div>
      {
        typing &&
        <p>User is typing....</p>
      }
      <form onSubmit={handleSubmit} className="message_form">
        <textarea rows='1' placeholder="type a message.." value={message} onChange={handleInput}/>
        <button type='submit'><AiOutlineSend/></button>
      </form>
    </div>
  )
}

export default  Message
