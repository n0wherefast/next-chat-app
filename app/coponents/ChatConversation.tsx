import React, { useEffect, useRef, useState } from 'react'
import { onSnapshot,query,where,collection, orderBy,} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useGlobalContext } from '../context/context'
import {caesarCipher }from '../utils/cCipher'
import {capitalize} from '../utils/capitalize'
import { LuMessagesSquare } from 'react-icons/lu'

interface MESSAGE {
    createdAt:any;
    id:string;
    room:string;
    text:string;
    user:string;
    userEmail:string;
}
export interface ROOM  {
    room: string | null
  }
function ChatConversation({room}:ROOM) {
    const [messages,setMessages] = useState<MESSAGE[]>([])
    const [messagesError,setMessagesError] = useState<string | null>(null)
    const {user} = useGlobalContext()
    const email = user?.email
    const scrollToBottom = useRef<HTMLDivElement>(null)
    useEffect(() =>{
        setMessages([])
        setMessagesError(null)
        const queryMess = query(collection(db,"messages"),where("room","==",room),orderBy('createdAt'));
        const unsubscribe = onSnapshot(queryMess,(snapshot)=>{
            const nextMessages: MESSAGE[] = []
            snapshot.forEach((doc)=>{
                const data = doc.data()
                nextMessages.push({
                    id: doc.id,
                    createdAt: data.createdAt,
                    room: data.room,
                    text: data.text,
                    user: data.user,
                    userEmail: data.userEmail,
                })
            })
            setMessages(nextMessages)
        },(error)=>{
            console.error("Failed to load chat messages:", error)
            setMessagesError("Messages could not be loaded. Please try again.")
        })
        return unsubscribe
    },[room])

    useEffect(()=>{
        if(scrollToBottom.current){
            scrollToBottom.current.scrollIntoView()
        }
    },[messages])
  return (
    <div
      className="flex min-h-20 flex-1 flex-col overflow-y-auto bg-[#fbfcff] px-4 py-5 sm:px-7"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messagesError && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {messagesError}
        </p>
      )}
      {!messagesError && messages.length === 0 && (
        <div className="m-auto max-w-xs py-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <LuMessagesSquare size={22} aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-slate-800">It&apos;s quiet in here</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">Start the conversation with a friendly hello.</p>
        </div>
      )}
      {messages.map((message) => {
        const { id, user: sender, text, userEmail } = message
        const isCurrentUser = userEmail === email
        const decodedText = caesarCipher(text).toLowerCase()
        return (
          <div key={id} className={`mb-4 flex w-full items-end gap-2.5 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            {!isCurrentUser && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                {(sender || 'G').charAt(0).toUpperCase()}
              </span>
            )}
            <div className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
              <p className="mb-1 px-1 text-[11px] font-semibold text-slate-500">{sender || 'Guest'}</p>
              <article
                className={`rounded-2xl px-4 py-2.5 ${
                  isCurrentUser
                    ? 'rounded-br-md bg-indigo-600 text-white'
                    : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-100'
                }`}
              >
                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                  {capitalize(decodedText)}
                </p>
              </article>
            </div>
            {isCurrentUser && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {(sender || 'Y').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        )
      })}
      <div ref={scrollToBottom} />
    </div>
  )
}

export default ChatConversation
