'use client'
import React from 'react'
import {auth,gProvider} from '../../firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { useGlobalContext } from '../../context/context'

function WrappedAuth() {
    
    const {SignInWithGoogle} = useGlobalContext()
  return (
    <>
        <div className=' text-white text-2xl font-bold max-w-full h-56 backdrop-brightness-75 backdrop-blur-[5px] p-5 '>
           <div className='flex flex-col justify-start items-center gap-8 backdrop-brightness-90 rounded-xl p-4'>
            <p>Sign in with Google</p>
            <button className='  flex gap-2 w-52 items-center justify-center rounded-md p-2 font-semibold bg-sky-500  text-slate-100' 
             onClick={()=>SignInWithGoogle()}>Sign In <FcGoogle size={30}/> </button>
           </div>
            
        </div>
      
    </>
  )
}

export default WrappedAuth
