'use client'
import React, { FormEvent, useState } from 'react'
import { addDoc,collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'

type Props = {
    room:string;
}

function WrappedChat(props:Props) {
    const [newMessage,setNewMessage] = useState("")
    const[switchInput ,setSwitchInput] = useState(true)
    const {room} = props

    const messageRef = collection(db,"messages")

    const HandelSubmit = async (e:FormEvent)=> {
        e.preventDefault()
        console.log(newMessage)
        if (newMessage==="") return;
        await addDoc(messageRef,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser?.displayName,
            room,
        });
        setNewMessage("")
    };
  return (
    <div className='bg-emerald-100 w-full h-[9rem] flex  items-center flex-col gap-2'>
        <div className='w-full p-1 bg-emerald-100 flex gap-2'>
            <button onClick={()=>setSwitchInput(true)} className={`${switchInput=== true? 'bg-sky-400 ' :'bg-emerald-400'} p-1 px-2 rounded-lg text-white font-semibold`}>text</button>
            <button onClick={()=>setSwitchInput(false)} className={`${switchInput=== false? 'bg-sky-400 ' :'bg-emerald-400'} p-1 px-2 rounded-lg text-white font-semibold`}>image</button>
        </div>
        { switchInput === true ?<form action="" className='flex w-full  justify-around items-center' onSubmit={()=>HandelSubmit}>
            <input type="text" 
                className=' p-2 rounded-xl w-[80%] h-[5.6rem] focus:outline-none focus:ring ring-sky-500 ' 
                placeholder='type a message'
                onChange={(e)=>setNewMessage(e.target.value)}
            />
            <button  type='submit' className='bg-sky-400 rounded-lg p-2 h-[3rem] font-semibold text-lg text-white flex items-center justify-center'>Send</button>
        </form> :
        <form action="" className='flex w-full  justify-around items-center' onSubmit={()=>HandelSubmit}>
            <input type="text" 
                className=' p-2 rounded-xl w-[80%] h-[5rem] focus:outline-none focus:ring ring-sky-500' 
                placeholder='Type a prompt'
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button  type='submit' className='bg-sky-400 rounded-lg p-2 h-[3rem] font-semibold text-lg text-white flex items-center justify-center'>Send</button>
        </form>}
    </div>
  )
}

export default WrappedChat
