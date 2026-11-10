'use client'
import { useContext,createContext, ReactNode, useState, useEffect, useRef } from "react"
import { signInWithPopup,signOut,onAuthStateChanged} from "firebase/auth";
import {auth ,gProvider} from '../../firebase/firebase'

interface ContextType {
    user:any;
    isAuth:boolean;
    setIsAuth:any;
    SignInWithGoogle:()=>Promise<void>;
    isSigningIn:boolean;
    authError:string | null;
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
    SignInWithGoogle: async ()=>{},
    isSigningIn:false,
    authError:null,
    SignOut : ()=>{},
    currentUser:{},
    inputRoomRef : '',
    room:'',
})




const Provider : React.FC<{children:ReactNode}> = ({children}) => {
    const [user,setUser] = useState<object>()
    const [currentUser,setcurrentUser] = useState<object>()
    const [isAuth,setIsAuth] = useState(false)
    const [isSigningIn,setIsSigningIn] = useState(false)
    const [authError,setAuthError] = useState<string | null>(null)
    const [room,setRoom] = useState <string | null>(null)
    const inputRoomRef = useRef <HTMLInputElement | null> (null)

    const SignOut = async () =>{
        await signOut(auth)
     }
    const SignInWithGoogle = async () => {
        setAuthError(null)
        setIsSigningIn(true)
        try{
            const res = await signInWithPopup(auth,gProvider)
            setUser(res.user)
            setIsAuth(true)
        } catch(error: unknown){
            console.error("Google sign-in failed:", error)
            const code =
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                typeof error.code === "string"
                    ? error.code
                    : null

            switch (code) {
                case "auth/unauthorized-domain":
                    setAuthError("This site's domain is not authorized in Firebase Authentication.")
                    break
                case "auth/operation-not-allowed":
                    setAuthError("Google sign-in is not enabled in Firebase Authentication.")
                    break
                case "auth/popup-blocked":
                    setAuthError("The sign-in popup was blocked. Allow popups and try again.")
                    break
                case "auth/popup-closed-by-user":
                    setAuthError("The sign-in window was closed before completing sign-in.")
                    break
                default:
                    setAuthError(
                        code
                            ? `Google sign-in failed (${code}).`
                            : "Google sign-in failed. Check the browser console for details."
                    )
            }
        } finally {
            setIsSigningIn(false)
        }
  }
useEffect(()=>{
             const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser!)

            if (currentUser){
                setIsAuth(true)
            }else{
                setIsAuth(false)
            }
          })
          return unsubscribe
        },[]) 
       
    return(
        <AppContext.Provider value={{SignInWithGoogle,isSigningIn,authError,user,isAuth,setIsAuth,SignOut,currentUser,room,setRoom,inputRoomRef}}>
                {children}
        </AppContext.Provider>
    )
}
const useGlobalContext = () => {
    return useContext(AppContext)
}

export {Provider,useGlobalContext}
