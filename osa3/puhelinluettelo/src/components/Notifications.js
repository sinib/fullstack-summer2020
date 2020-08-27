import React from 'react'

// Renders error- and notification messages
const Notification = ({msgData}) => {
    const msg = msgData[0]
    const isError = msgData[1]

    if (msg === null){
        return null
    }

    else {
        return <div className={isError ? "error" : "notification"}>
                {msg}
                </div>
    }

  }

  export default Notification