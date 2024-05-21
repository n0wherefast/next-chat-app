'use client'
import { useContext,createContext, ReactNode, useState } from "react"
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth ,gProvider} from '../firebase/firebase'

const AppContext = createContext({})


const Provider : React.FC<{children:ReactNode}> = ({children}) => {
    const [user,setUser] =useState()
    const SignInWithGoogle = async () => {
       const res = await signInWithPopup(auth,gProvider)
       setUser({userName:res.user.displayName!, photo:res.user.photoURL!})
         console.log(res)
  }

  console.log(user)

    return(
        <AppContext.Provider value={{SignInWithGoogle,user}}>
                {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {Provider,useGlobalContext}

