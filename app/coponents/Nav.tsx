'use client'
import React, { use } from 'react'
import { FaUser } from 'react-icons/fa6'
import { useGlobalContext } from '../context/context'
import Image from 'next/image'

function Nav() {
    const {user} = useGlobalContext()
  return (
    <>
     <nav className=' w-full  bg-emerald-500 p-3 font-medium text-lg md:text-2xl text-slate-100  flex justify-between items-center'>
        <p>Next Chat App</p>
        <div className='p-1' >
            { user ? <span className='flex justify-center items-center gap-2'>
                <p className=''>{user.userName}</p>
                <Image className='w-full h-full  rounded-full' width={50} height={50} src={user.photo} alt='photo profile'/>
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

export default Nav
