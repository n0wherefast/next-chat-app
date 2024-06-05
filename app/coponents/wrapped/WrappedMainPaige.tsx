'use client'
import Auth from "../Auth";
import { useGlobalContext } from "../../context/context";
import { useState,useRef } from "react";
import Chat from "../Chat";
import { Interface } from "readline";
import ChatConversation from "../ChatConversation";
import Link from "next/link";
import ChatSelect from "../ChatSelect";


export interface ROOM  {
  room: string | null
}


function WrappedMainPaige() {
    const {isAuth ,room} = useGlobalContext()
   
  
    return (
      <main className=" w-full h-[100vh] flex flex-col items-center justify-center bg-bg1 bg-cover  ">
        <div className="backdrop-blur-sm bgBlur-IOS  w-full flex justify-center">
          <div className="w-full h-screen md:w-[60vw] flex  justify-center items-center">
             {
          !isAuth ?  <div className="w-[50vh] rounded-2xl bg-sky-500 "><Auth /></div>
             : 
            <>
              {room ? (
                <div className="w-full h-full flex flex-col justify-end bg-emerald-200  md:h-[80vh] md:rounded-2xl ">
                   <ChatConversation room={room!}/>
                   <Chat room={room!}/>
                </div>
              ) :
              (
                <div className="">
                  <ChatSelect />
                </div>
                
              )
              }
            </>
        }
           </div>
        </div>
           
       
        
      </main>
    );
}

export default WrappedMainPaige
