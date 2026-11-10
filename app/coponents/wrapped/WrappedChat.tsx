'use client'
import React, { FormEvent, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../firebase/firebase'
import { LuSend } from "react-icons/lu";
import { caesarCipher } from '../../utils/cCipher'

type Props = {
  room: string;
}

function WrappedChat({ room }: Props) {
  const [newMessage, setNewMessage] = useState("")
  const messageRef = collection(db, "messages")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = newMessage.trim()
    if (!message) return
    await addDoc(messageRef, {
      text: caesarCipher(message.toLocaleUpperCase()),
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      userEmail: auth.currentUser?.email,
      room
    })
    setNewMessage("")
  }

  return (
    <div className="border-t border-slate-100 bg-white p-4 sm:px-6 sm:py-5">
      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <label htmlFor="chat-message" className="sr-only">Write a message</label>
        <input
          id="chat-message"
          type="text"
          className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          placeholder={`Message ${room}...`}
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          <LuSend size={19} aria-hidden="true" />
        </button>
      </form>
      <p className="mt-2 hidden text-center text-xs text-slate-400 sm:block">Be kind. Good conversations start with respect.</p>
    </div>
  )
}

export default WrappedChat
