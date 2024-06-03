'use client'
import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { useGlobalContext } from '../../context/context'
import Image from 'next/image'

function WrappedNav() {
    const {user,SignOut} = useGlobalContext()
    // console.log(user)

   
    return (
      <>
       <nav className=' w-full h-[5rem] fixed  bg-emerald-400 p-3 font-medium text-lg md:text-2xl text-slate-100  flex justify-between items-center'>
          <p>Next Chat App</p>
          <div className='p-1 text-[1.1rem]' >
              { user ? <span className='flex justify-center items-center gap-2 h-[5rem] w-[25rem] '>
                    <p>Welcome, </p>
                  <p className='  max-w-[300px] text-md'>{user.displayName}</p> |
                  <button onClick={()=>SignOut()} className=' text-sm cursor-pointer hover:text-sky-500 transition-all duration-150 '> Log Out</button>
                  <Image className=' rounded-full' width={50} height={50} src={user.photoURL} alt='photo profile'/>
                  </span>  :
                  <div className=' w-14 h-14 bg-zinc-500 flex items-center justify-center  rounded-full'>
                      <FaUser size={30}/>
                  </div>                  
                  }
          </div>
       </nav>      
      </>
    )
}

export default WrappedNav
