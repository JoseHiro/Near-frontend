import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Message from '../Message/ Message';
import {getAuthToken} from '../../../Auth/auth';
import './messages.css';

const Messages = () => {

  const [chats, setChats] = useState([]);

  useEffect(() => {

    const token = getAuthToken();
    const getChatMembers = async () => {
      const response = await fetch('http://localhost:8080/chat/members', {
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })

      const resData = await response.json();
      console.log(resData.chatMember);
      setChats(resData.chatMember);
    }

    getChatMembers();
  },[])

  return (
    <section id="messages_container">
      <div className="inbox">
        <div className='messangers'>
          <div className="messages_container_title_user" >
            <h2>Users</h2>
          </div>
          {chats.map((chat, index) => {
            return (
            <a href={'/chats/' + chat.memberId} key={index}>
              <article>
                <img className='message_profile_img' alt='' src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
                <div>
                  <h4>{chat.name}</h4>
                  <p>Last message...</p>
                </div>
              </article>
            </a>
            )
          })}
        </div>

        <div className='messages'>
          <div className="messages_container_title_messages" >
            <h2>Messages</h2>
          </div>
          <Message/>
        </div>
      </div>
    </section>
  )
}

export default Messages
