'use client'
import React from 'react'
import {auth,gProvider} from '../firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { useGlobalContext } from '../context/context'

function Auth() {
    const {SignInWithGoogle} = useGlobalContext()
  return (
    <>
        <div className=' text-2xl font-bold w-72 h-56 bg-zinc-300 flex flex-col justify-start   items-center rounded-lg gap-14 p-5 '>
            <p>Sign in with Google</p>
            <button className=' flex gap-2 w-52 items-center justify-center rounded-md p-2 font-semibold bg-sky-500  text-slate-100' onClick={()=>SignInWithGoogle()}>Sign In <FcGoogle size={30}/> </button>
        </div>
      
    </>
  )
}

export default Auth
