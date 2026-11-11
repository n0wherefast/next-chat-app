'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { LuHash, LuMenu, LuMessagesSquare, LuSparkles, LuX } from 'react-icons/lu'
import { useGlobalContext } from '../../context/context'

const featuredRooms = ['Room One', 'Room Two', 'Room Three']

function WrappedNav() {
  const { user, SignOut, isAuth, room, setRoom } = useGlobalContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!isAuth) return null

  const account = (
    <>
      {user?.photoURL ? (
        <Image
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
          width={40}
          height={40}
          src={user.photoURL}
          alt=""
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <FaUser size={15} aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-slate-800">
          {user?.displayName || 'Welcome'}
        </span>
        <span className="block truncate text-xs text-slate-500">Personal account</span>
      </span>
      <button
        type="button"
        onClick={() => SignOut()}
        className="rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Log out
      </button>
    </>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-[4.5rem] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <LuMessagesSquare size={19} aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-bold tracking-tight text-slate-900">Next Chat</span>
          {room && (
            <>
              <span className="text-slate-300">/</span>
              <span className="truncate text-sm font-medium text-slate-600">{room}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-account-menu"
          className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {isMobileMenuOpen ? <LuX size={21} aria-hidden="true" /> : <LuMenu size={21} aria-hidden="true" />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-account-menu"
          className="fixed inset-x-0 top-[4.5rem] z-50 border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden"
        >
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            {user?.photoURL ? (
              <Image
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
                width={40}
                height={40}
                src={user.photoURL}
                alt=""
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <FaUser size={15} aria-hidden="true" />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-slate-800">
                {user?.displayName || 'Welcome'}
              </span>
              <span className="block truncate text-xs text-slate-500">Personal account</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => SignOut()}
            className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Log out
          </button>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17rem] flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[5.25rem] items-center gap-3 border-b border-slate-100 px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <LuMessagesSquare size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[15px] font-bold tracking-tight text-slate-900">Next Chat</p>
            <p className="text-[11px] text-slate-500">A place to talk</p>
          </div>
        </div>

        <div className="mt-8 px-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Your rooms</p>
            <span className="text-xs text-slate-400">{featuredRooms.length + (room && !featuredRooms.includes(room) ? 1 : 0)}</span>
          </div>
          <div className="space-y-1">
            {[...featuredRooms, ...(room && !featuredRooms.includes(room) ? [room] : [])].map((roomName) => {
              const isSelected = room === roomName
              return (
                <button
                  type="button"
                  key={roomName}
                  onClick={() => setRoom(roomName)}
                  aria-current={isSelected ? 'page' : undefined}
                  className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? 'bg-indigo-50 font-semibold text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <LuHash size={17} className={isSelected ? 'text-indigo-500' : 'text-slate-400'} aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{roomName}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-label="Current room" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            {account}
          </div>
          <div className="mt-4 flex items-center gap-2 px-2 text-xs text-slate-400">
            <LuSparkles size={14} aria-hidden="true" />
            Good conversations start here
          </div>
        </div>
      </aside>

    </>
  )
}

export default WrappedNav
