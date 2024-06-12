import React from 'react'
import WrappedChat from './wrapped/WrappedChat'


function Chat({room}:any) {

//  const {room} = props
  return (
    <>
      <WrappedChat room={room} />  
    </>
  )
}

export default Chat
