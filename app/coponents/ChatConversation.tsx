import React, { useEffect, useRef, useState } from 'react'
import { onSnapshot,query,where,collection, orderBy,} from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { useGlobalContext } from '../context/context'
// import ROOM from '../coponents/wrapped/WrappedMainPaige'

interface MESSAGE {
    createdAt:any;
    id:string;
    room:string;
    text:string;
    user:string;
}
export interface ROOM  {
    room: string | null
  }
function ChatConversation({room}:ROOM) {
    const messageRef = collection(db,"messages")
    const [messages,setMessages] = useState([])
    const {user} = useGlobalContext()
    const { displayName} = user
    const scrollToBottom = useRef<HTMLDivElement>(null)
    useEffect(() =>{
        const queryMess = query(messageRef,where("room","==",room),orderBy('createdAt'));
        onSnapshot(queryMess,(snapshot)=>{
            const messages:any = []
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})
            })
            setMessages(messages)
        })
    },[]) 

    useEffect(()=>{
        if(scrollToBottom.current){
            scrollToBottom.current.scrollIntoView()
        }
    },[messages])
  return (
    <div className=' flex flex-col max-w-full min-h-20 overflow-y-scroll '>
      {messages.map((mex:MESSAGE)=>{
        let {id,user,text,createdAt} = mex
        return(
                <div key={id} >
                    <div className={`max-w-full flex flex-col p-2 ${displayName===user?' items-end ' : '  items-start'}`} >
                        <div className={`  comic max-w-[9rem] min-h-[5rem] p-3 ${displayName===user?' bg-emerald-600 rounded-[2em_2em_0]' : ' bg-sky-600 rounded-[0_2em_2em] '}`}>
                           <h1 className=' font-semibold text-white' >{user}</h1>
                           <p className=' max-w-[90%]  rounded-2xl m-1 p-2 text-white'>{text}</p>
                           {/* <p>{}</p>   */}
                        </div>
                    </div>
                </div>
        )
      })}
      <div ref={scrollToBottom}/>
    </div>
  )
}

export default ChatConversation
