import React from 'react'
import Message from '../Message/ Message';
import './messages.css';
const Messages = () => {

  const member = ["Mike", "Emily", "Frank", "Kevin", "Lin", "David", "Frank", "Kevin", "Lin", "David"]

  return (
    <section id="messages_container">
      <div className='messagers'>
        <div className="messages_container_title" >
          <h4>Users</h4>
        </div>
        {member.map((name, index) => {
          return (
          <article key={index}>
            <h4>name</h4>
          </article>
          )
        })}
      </div>

      <div className='messages'>
        <div className="messages_container_title" >
          <h4>Messages</h4>
        </div>
        <Message/>
      </div>
    </section>
  )
}

export default Messages
