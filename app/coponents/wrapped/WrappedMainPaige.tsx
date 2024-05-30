'use client'
import Auth from "../Auth";
import { useGlobalContext } from "../../context/context";
import { useState,useRef } from "react";
import Chat from "../Chat";
import { Interface } from "readline";





function WrappedMainPaige() {
    const {isAuth ,setIsAuth} = useGlobalContext()
    const [room,setRoom] = useState <string | null>(null)
    const inputRoomRef = useRef <HTMLInputElement | null> (null)
  
    return (
      <main className=" w-full h-[100vh] flex items-center justify-center bg-zinc-100">
        {
          !isAuth ?  <div><Auth /></div>
             : 
            <>
              {room ? (
                <div className="w-full h-screen flex flex-col justify-end bg-emerald-50">
                   {/* <Chat room={room!}/> */}
                   ROOM
                </div>
              ) :
              (
                <div className=" font-semibold flex flex-col w-64 gap-5 items-center bg-emerald-400 p-2 text-white rounded-xl">
                  <label className=" text-xl"  htmlFor="">Enter Room Name</label>
                  <input className=" text-black rounded-lg p-1" type="text"  ref={inputRoomRef} />
                  <button className=" bg-sky-400 p-2 w-28 rounded-lg hover:bg-sky-600" onClick={()=>setRoom(inputRoomRef.current!.value)} >Enter</button>
                </div>
              )
              }
            </>
        }
        
      </main>
    );
}

export default WrappedMainPaige
