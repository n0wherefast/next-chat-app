'use client'
import Auth from "./coponents/Auth";
import { useGlobalContext } from "./context/context";
// import Cookies from "universal-cookie";
import { useState,useRef } from "react";
import Chat from "./coponents/Chat";

// const cookies = new Cookies()

export default function Home() {
  const {isAuth ,setIsAath} = useGlobalContext()
  // const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)
  const inputRoomRef = useRef(null)

  return (
    <div className=" w-full h-screen flex items-center justify-center bg-zinc-100">
      {
        !isAuth ? <Auth  />
           : 
          <div>
            {room ? (
              <div>chat</div>
            ) :
            (
              <div className=" font-semibold flex flex-col w-64 gap-5 items-center bg-emerald-400 p-2 text-white rounded-xl">
                <label className=" text-xl"  htmlFor="">Enter Room Name</label>
                <input className=" text-black rounded-lg p-1" type="text"  ref={inputRoomRef} />
                <button className=" bg-sky-400 p-2 w-28 rounded-lg hover:bg-sky-600" onClick={()=>setRoom(inputRoomRef.current!.value)} >Enter</button>
              </div>
            )
            }
          </div>
      }
      
    </div>
  );
}
