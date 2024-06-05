'use client'
import React, { FormEvent, useState } from 'react'
import { addDoc,collection, serverTimestamp} from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'
import { LuSend } from "react-icons/lu";
import { useGlobalContext } from '@/app/context/context';
import { AiOutlinePicture } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";



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
    <div className=' max-w-full p-2 min-h-[7rem] flex items-center flex-col rounded-t-2xl md:rounded-2xl '>
        <div className='w-full h-10 flex  items-center  gap-2'>
            <button onClick={()=>setSwitchInput(true)} className={`${switchInput=== true? 'bg-sky-600 ' :'bg-sky-300'} p-1 px-2 rounded-full w-9 h-9 flex justify-center items-center text-white font-semibold`}><BsChatText size={25}/></button>
            <button onClick={()=>setSwitchInput(false)} className={`${switchInput=== false? 'bg-sky-600 ' :'bg-sky-300'} p-1 px-2 rounded-full w-9 h-9 flex justify-center items-center text-white font-semibold`}><AiOutlinePicture size={25}/></button>
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
