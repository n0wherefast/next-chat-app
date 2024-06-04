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
      <main className=" w-full h-[100vh] flex flex-col items-center justify-center bg-bg1 bg-cover ">
        <div className="backdrop-blur-sm  w-full flex justify-center">
          <div className="w-full h-[90vh] mt-[5rem]  md:w-[70vw] flex  justify-center items-center ">
             {
          !isAuth ?  <div className="w-full "><Auth /></div>
             : 
            <>
              {room ? (
                <div className="w-full h-screen flex flex-col justify-end bg-emerald-200">
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
