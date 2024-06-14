'use client'
import { useContext,createContext, ReactNode, useState, useEffect, useRef } from "react"
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "firebase/auth";
import {auth ,gProvider} from '../../firebase/firebase'
import Cookies from "universal-cookie";

interface ContextType {
    user:any;
    isAuth:boolean;
    setIsAuth:any;
    SignInWithGoogle:any;
    SignOut : Function;
    currentUser:any
    inputRoomRef : any
    setRoom: any,
    room:string | null

}

const AppContext = createContext<ContextType>({
    user: {},
    isAuth: false,
    setIsAuth: ()=>{},
    setRoom: ()=>{},
    SignInWithGoogle: ()=>{},
    SignOut : ()=>{},
    currentUser:{},
    inputRoomRef : '',
    room:'',
})




const Provider : React.FC<{children:ReactNode}> = ({children}) => {
    const [user,setUser] = useState<object>()
    const [currentUser,setcurrentUser] = useState<object>()
    const [isAuth,setIsAuth] = useState(false)
    const [room,setRoom] = useState <string | null>(null)
    const inputRoomRef = useRef <HTMLInputElement | null> (null)

    const SignOut = async () =>{
        await signOut(auth)
     }
    const SignInWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth,gProvider)
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
            }else{
                setIsAuth(false)
            }
          })
        },[]) 
       
    return(
        <AppContext.Provider value={{SignInWithGoogle,user,isAuth,setIsAuth,SignOut,currentUser,room,setRoom,inputRoomRef}}>
                {children}
        </AppContext.Provider>
    )
}
const useGlobalContext = () => {
    return useContext(AppContext)
}

export {Provider,useGlobalContext}

