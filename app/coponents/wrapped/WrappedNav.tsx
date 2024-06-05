'use client'
import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { useGlobalContext } from '../../context/context'
import Image from 'next/image'
import { LuSend } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";



function WrappedNav() {
    const {user,SignOut,isAuth,room,setRoom} = useGlobalContext()

   
    return (
      < div className='flex  w-full   justify-center fixed z-50 '>
       {isAuth&&<div>
        { room === null? <nav className=' w-[100vw] min-h-[3rem] bg-emerald-500 p-3 font-medium text-lg md:text-2xl text-slate-100  flex md:flex-row flex-col justify-between items-center'>
            {/* <p>Next Chat App</p> */}
            <div className='p-1 text-[1rem]' >
                { user ? <span className='flex justify-center items-center gap-2 h-[2rem] w-[25rem] '>
                      <p className='text-[1.2rem] font-bold'>Welcome, </p>
                    <Image className=' rounded-full w-9 h-9 ' width={50} height={50} src={user.photoURL} alt='photo profile'/> 
                    <p className='  max-w-[300px] text-md'>{user.displayName}</p> |
                    <button onClick={()=>SignOut()} className=' text-sm cursor-pointer hover:text-sky-500 transition-all duration-150 '> Log Out</button>
                    </span>  :
                    <div className=' w-14 h-14 bg-zinc-500 flex items-center justify-center  rounded-full'>
                        <FaUser size={30}/>
                    </div>                  
                    }
            </div>
        </nav> :
        <nav className=' w-[100vw] md:w-[60vw] min-h-[3rem] md:mt-3 md:rounded-full  bg-cyan-500 p-3 font-medium text-lg md:text-2xl text-slate-100  flex md:flex-row flex-col justify-between items-center'>
          {room&&<div className="gap-2 flex items-center justify-between text-md h-10 w-full ">
              <div className=' text-2xl font-light text-white flex items-center gap-3 '> <LuSend size={25}/>{room}</div>
              <button className=' rounded-full flex items-center justify-center w-12 h-12 bg-emerald-400 cursor-pointer hover:bg-emerald-700 text-white p-2 transition-all duration-400' onClick={()=>setRoom(null)}><IoExitOutline size={28}/></button>
            </div>}
        </nav>
        }
       </div>
       }    
      </div>
    )
}

export default WrappedNav
