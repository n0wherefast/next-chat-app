'use client'
import { useContext,createContext, ReactNode, useState } from "react"
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth ,gProvider} from '../firebase/firebase'
import Cookies from "universal-cookie";

const AppContext = createContext({})


const Provider : React.FC<{children:ReactNode}> = ({children}) => {
    const cookies = new Cookies()
    const [user,setUser] = useState<object>()
    const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))


    const SignInWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth,gProvider)
            cookies.set("auth-token",res.user.refreshToken)
            setUser({userName:res.user.displayName!, photo:res.user.photoURL!})
            setIsAuth(true)
            console.log(res) 
        } catch(err){
            console.log(err)
        }
       
  }

  console.log(user)

    return(
        <AppContext.Provider value={{SignInWithGoogle,user,isAuth,setIsAuth}}>
                {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {Provider,useGlobalContext}

