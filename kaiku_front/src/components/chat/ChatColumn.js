import React, { useState, useRef, useEffect, useContext } from 'react'

import useField from '../../hooks/hooks'
import keyGen from '../../util/keyGen'
import useChat from '../../hooks/useChat'
import messageValidation from '../../util/inputValidation'
import InitialData from '../../providers/InitialData'
import InMessage from './message/InMessage'
import OutMessage from './message/OutMessage'
import DefaultMessage from './message/DefaultMessage'
import ProfilePage from '../profile/ProfilePage'
import UserPage from '../profile/UserPage'
import MessageForm from './MessageForm'
import ChatHeader from './ChatHeader'
import CurrentChat from '../../providers/CurrentChat'

const ChatColumn = ({ profileState, userState }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { currentChat } = useContext(CurrentChat)
  const { messages, sendMessage } = useChat(loggedUser.id, currentChat)

  const [searchInput, setSearchInput] = useState('')
  const messagesEndRef = useRef(null)
  const newMessage = useField('text')

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
  }

  const getUser = (user_id) => {
    const user = initialData.users.find(user => user.id === user_id) || { name: '', color: 'red' }
    return user
  }

  const listMessages = () => {
    if (currentChat === undefined) return
    if (messages === undefined || messages.length === 0) return <DefaultMessage />
    const filteredMsgs = messages.filter(msg => msg.content.includes(searchInput))
    return filteredMsgs.map(m =>
      m.user_id === loggedUser.id ?
        <OutMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
        <InMessage key={keyGen.generateKey(m.content)} content={m.content} user={getUser(m.user_id)} />)
  }

  useEffect(scrollToBottom, [initialData, messages])

  const removeReset = (object) => {
    const { reset, ...newObject } = object
    return newObject
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageValidation(newMessage.value)) {
      const newMessageObj = {
        content: newMessage.value,
        message_id: keyGen.generateId(),
        user_id: loggedUser.id
      }
      sendMessage(newMessageObj)

      newMessage.reset()
    }
  }
  return (
    <div className="chat-col col-7">
      <UserPage userState={userState} />
      <ProfilePage loggedUser={loggedUser} profileState={profileState} />

      <div>
        <ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} />
        <div className="read-container">
          <div className="relative">
            <div className="read-field">
              {listMessages()}
              <div id="beginning" ref={messagesEndRef}></div>
            </div>
          </div>
        </div>
        <MessageForm newMessage={newMessage} removeReset={removeReset} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default ChatColumn
