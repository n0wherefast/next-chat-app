'use client'
import React, { FormEvent, useState } from 'react'
import { addDoc,collection, serverTimestamp} from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'
import { LuSend } from "react-icons/lu";
import { useGlobalContext } from '@/app/context/context';


type Props = {
    room:string;
}

function WrappedChat(props:Props) {
    const [newMessage,setNewMessage] = useState("")
    const[switchInput ,setSwitchInput] = useState(true)
    const {room} = props
    const {setRoom} = useGlobalContext()

    const messageRef = collection(db,"messages")

    const HandelSubmit = async (e:FormEvent)=> {
        e.preventDefault()
        if (newMessage==="") return;
        await addDoc(messageRef,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser?.displayName,
            room 
        });
        setNewMessage("")
    };
   
  return (
    <div className='bg-emerald-400 max-w-full p-2 min-h-[7.5rem] flex  items-center flex-col gap-2'>
        <div className='w-full h-10 p-1 bg-emerald-400 flex  items-center justify-between gap-2'>
            <button onClick={()=>setSwitchInput(true)} className={`${switchInput=== true? 'bg-sky-600 ' :'bg-sky-300'} p-1 px-2 rounded-lg text-white font-semibold`}>text</button>
            <button onClick={()=>setSwitchInput(false)} className={`${switchInput=== false? 'bg-sky-600 ' :'bg-sky-300'} p-1 px-2 rounded-lg text-white font-semibold`}>image</button>
           |
            {room&&<div className="gap-2 flex items-center justify-around text-sm  font-bold  h-10 w-full ">
              <div className='   text-white '>Chat  {room}</div>
              <button className=' bg-amber-300 text-white  rounded-lg p-1' onClick={()=>setRoom('')}> Change Chat</button>
            </div>}
        </div>
        { switchInput === true ?<form action="" className='flex w-full  justify-around items-center' onSubmit={(e)=>HandelSubmit(e)}>
            <input type="text" 
                className=' p-2 rounded-xl w-[90%] h-[3rem] focus:outline-none focus:ring ring-sky-500' 
                placeholder='type a message'
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button  type='submit' className='bg-sky-400 rounded-full p-2 m-2 w-[3rem] h-[3rem] font-semibold text-lg text-white flex items-center justify-center'><LuSend size={25}/></button>
        </form> :
        <form action="" className='flex w-full  justify-around items-center' onSubmit={(e)=>HandelSubmit(e)}>
            <input type="text" 
                className=' p-2 rounded-xl w-[90%] h-[3rem] focus:outline-none focus:ring ring-sky-500' 
                placeholder='Type a prompt'
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button onKeyUp={()=>HandelSubmit} type='submit' className='bg-sky-400 rounded-full p-2 m-2 w-[3rem] h-[3rem] font-semibold text-lg text-white flex items-center justify-center hover:bg-emerald-500'><LuSend size={25}/></button>
        </form>}
    </div>
  )
}

export default WrappedChat
