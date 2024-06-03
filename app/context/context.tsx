'use client'
import { useContext,createContext, ReactNode, useState, useEffect } from "react"
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "firebase/auth";
import {auth ,gProvider} from '../firebase/firebase'
import Cookies from "universal-cookie";

interface ContextType {
    user:any;
    isAuth:boolean;
    setIsAuth:any;
    SignInWithGoogle:any;
    SignOut : Function;
    currentUser:any
}

const AppContext = createContext<ContextType>({
    user: {},
    isAuth: false,
    setIsAuth: ()=>{},
    SignInWithGoogle: ()=>{},
    SignOut : ()=>{},
    currentUser:{}
})




const Provider : React.FC<{children:ReactNode}> = ({children}) => {
    const cookies = new Cookies()
    const [user,setUser] = useState<object>()
    const [currentUser,setcurrentUser] = useState<object>()
    const [isAuth,setIsAuth] = useState(false)

    const SignOut = async () =>{
        await signOut(auth)
     }
    const SignInWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth,gProvider)
            // cookies.set("auth-token",res.user.refreshToken)
            // setUser({userName:res.user.displayName!, photo:res.user.photoURL!})
            setUser(res.user)
            setIsAuth(true)
            console.log(res) 
        } catch(err){
            console.log(err)
        }
  }
useEffect(()=>{
             onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser!)

            if (currentUser){
                setIsAuth(true)
                // console.log(user)
            }else{
                setIsAuth(false)
            }
          })
        },[]) 
       
    return(
        <AppContext.Provider value={{SignInWithGoogle,user,isAuth,setIsAuth,SignOut,currentUser}}>
                {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {Provider,useGlobalContext}

