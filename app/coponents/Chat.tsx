import React, { FormEvent, useState } from 'react'

function Chat() {
    const [newMessage,setNewMessage] = useState("")

    const HandelSubmit = (e:FormEvent)=> {
        e.preventDefault()
        console.log(newMessage)
    }
  return (
    <div className=''>
        <form action="" className='' onSubmit={()=>HandelSubmit}>
            <input type="text" 
                className='' 
                placeholder='type a message'
                onChange={(e)=>setNewMessage(e.target.value)}
            />
            <button  type='submit' className=''>Send</button>
        </form>
    </div>
  )
}

export default Chat
