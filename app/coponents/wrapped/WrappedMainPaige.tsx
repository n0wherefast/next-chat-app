'use client'
import Auth from "../Auth";
import { useGlobalContext } from "../../context/context";
import Chat from "../Chat";
import ChatConversation from "../ChatConversation";
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
          !isAuth ?  <div className="w-[50vh] rounded-2xl bg-cyan-500 "><Auth /></div>
             : 
            <>
              {room ? (
                
                <div className=" w-full h-full flex flex-col justify-end bg-sky-950  md:h-[80vh] md:rounded-2xl ">
                   <ChatConversation room={room!}/>
                   <Chat room={room!}/>
                </div>
              ) :
              (
                <div className=" flex">
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
