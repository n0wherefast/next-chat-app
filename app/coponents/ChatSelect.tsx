import React from 'react'
import { useGlobalContext } from '../context/context'

function ChatSelect() {
    const {inputRoomRef,setRoom} = useGlobalContext()

  return (
    <div className=" font-semibold flex flex-col w-64 gap-5 items-center bg-emerald-400 p-2 text-white rounded-xl">
                  <label className=" text-xl"  htmlFor="">Enter Room Name</label>
                  <input className=" text-black rounded-lg p-1" type="text"  ref={inputRoomRef} />
                  <button className=" bg-sky-400 p-2 w-28 rounded-lg hover:bg-sky-600" onClick={()=>setRoom(inputRoomRef.current!.value)} >Enter</button>
    </div>
  )
}

export default ChatSelect
