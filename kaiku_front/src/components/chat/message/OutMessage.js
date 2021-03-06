import React from 'react'

const OutMessage = ({ content }) => {
  return (
    <div className="out-container">
      <div className="out-message">
        <p>{content}</p>
        <span className="message-date"> </span>
      </div>
    </div>
  )
}

export default OutMessage