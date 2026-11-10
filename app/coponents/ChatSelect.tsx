'use client'
import React, { FormEvent } from 'react'
import { LuArrowUpRight, LuHash, LuPlus } from 'react-icons/lu'
import { useGlobalContext } from '../context/context'

const featuredRooms = ['Room One', 'Room Two', 'Room Three']
const roomColors = [
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
]

function ChatSelect() {
  const { inputRoomRef, setRoom } = useGlobalContext()

  const enterRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const roomName = inputRoomRef.current?.value.trim()
    if (roomName) setRoom(roomName)
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Your rooms</h2>
          <p className="mt-1 text-sm text-slate-500">Choose a room and join the conversation.</p>
        </div>
        <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
          {featuredRooms.length} rooms
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.8fr)]">
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredRooms.map((room, index) => (
            <button
              key={room}
              type="button"
              onClick={() => setRoom(room)}
              className="group flex min-h-36 flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${roomColors[index]}`}>
                <LuHash size={20} aria-hidden="true" />
              </span>
              <span className="mt-5 flex w-full items-center gap-2">
                <span className="flex-1 text-sm font-bold text-slate-900">{room}</span>
                <LuArrowUpRight className="text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600" size={17} aria-hidden="true" />
              </span>
              <span className="mt-1 text-xs text-slate-500">Open shared conversation</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:p-6">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <LuPlus size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-bold text-slate-900">Have a room in mind?</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Enter its name to join an existing room or start a new conversation.
            </p>
          </div>
          <form className="mt-6" onSubmit={enterRoom}>
            <label htmlFor="room-name" className="sr-only">Room name</label>
            <div className="flex gap-2">
              <input
                id="room-name"
                ref={inputRoomRef}
                type="text"
                placeholder="Room name"
                className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Join <LuArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ChatSelect
