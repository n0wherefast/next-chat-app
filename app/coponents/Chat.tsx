import React from 'react'
import WrappedChat from './wrapped/WrappedChat'


function Chat(props:any) {
 const {room} = props
  return (
    <>
      <WrappedChat room={room} />  
    </>
  )
}

export default Chat
