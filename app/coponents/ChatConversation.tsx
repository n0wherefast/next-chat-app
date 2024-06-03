import React, { useEffect, useState } from 'react'
import { getDocs,collection,} from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'



function ChatConversation() {
    const messageRef = collection(db,"messages")
    const [messages,setMessages] = useState([])

    useEffect(() =>{
    const getData = async () => {
    //    const message = await  getDoc(messageRef)
       const data = await getDocs(collection(db,`messages`))
       console.log(data)
    }
    getData()
    })
    
    

  return (
    <div className=' max-w-full min-h-20 bg-red-400'>
      {messages}
    </div>
  )
}

export default ChatConversation
