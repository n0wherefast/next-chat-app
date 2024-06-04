import React from 'react'
import { useGlobalContext } from '../context/context'

function ChatSelect() {
    const {inputRoomRef,setRoom} = useGlobalContext()

  return (
    <div className=" font-semibold flex flex-col w-64 gap-5 items-center bg-emerald-400 p-2 text-white rounded-xl">
                  <label className=" text-xl"  htmlFor="">Enter Chat Name</label>
                  <input className=" text-black rounded-lg p-1" type="text"  ref={inputRoomRef} />
                  <label className=" text-xl"  htmlFor="">Or Select Room</label>
                  <select name='chat' className='text-black p-2 rounded-md' ref={inputRoomRef} >
                    <option value="volvo">Room One</option>
                    <option value="saab">Room Two</option>
                    <option value="mercedes">Room Three</option>
                    <option value="audi">Room Four</option>
                  </select>
            <button className=" bg-sky-400 p-2 w-28 rounded-lg hover:bg-sky-600" onClick={()=>setRoom(inputRoomRef.current!.value)} >Enter</button>
    </div>
  )
}

export default ChatSelect
