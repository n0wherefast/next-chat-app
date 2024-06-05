import React from 'react'
import { useGlobalContext } from '../context/context'

function ChatSelect() {
    const {inputRoomRef,setRoom} = useGlobalContext()

   

  return (
    <div className=" font-semibold flex flex-col w-64 gap-5 items-center bg-emerald-400 p-2 text-white rounded-xl">
                  <label className=" text-xl"  htmlFor="">Enter Chat Name</label>
                  <input className=" text-black rounded-lg p-1" type="text"  ref={inputRoomRef} />
            <button className=" bg-sky-400 p-2 w-28 rounded-lg hover:bg-sky-600" onClick={()=>setRoom(inputRoomRef.current!.value)} >Enter</button>
            <label className=" text-xl"  htmlFor="">Select Chat Room</label>
            <div className='flex flex-row gap-2'>
              <button className=" bg-sky-400 p-2 w-12 h-12 border border-white rounded-full hover:bg-sky-600" onClick={()=>setRoom('Room One')} >1</button>
              <button className=" bg-sky-400 p-2 w-12 h-12 border border-white rounded-full hover:bg-sky-600" onClick={()=>setRoom('Room Two')} >2</button>
              <button className=" bg-sky-400 p-2 w-12 h-12 border border-white rounded-full hover:bg-sky-600" onClick={()=>setRoom('Room Three')} >3</button>
            </div>
            
    </div>
  )
}

export default ChatSelect
