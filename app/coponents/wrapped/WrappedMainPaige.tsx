'use client'
import Auth from "../Auth";
import { useGlobalContext } from "../../context/context";
import Chat from "../Chat";
import ChatConversation from "../ChatConversation";
import ChatSelect from "../ChatSelect";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuHash } from "react-icons/lu";

export interface ROOM {
  room: string | null
}

function WrappedMainPaige() {
  const { isAuth, room, setRoom, user } = useGlobalContext()

  if (!isAuth) {
    return (
      <main className="auth-shell flex min-h-svh items-start justify-center px-4 py-8 sm:px-8 sm:py-10">
        <div className="w-full max-w-6xl">
          <Auth />
        </div>
      </main>
    )
  }

  return (
    <main className="workspace-shell min-h-svh px-4 pb-24 pt-[5.5rem] sm:px-7 lg:ml-[17rem] lg:px-9 lg:pb-8 lg:pt-8">
      {room ? (
        <section
          aria-label={`${room} chat`}
          className="mx-auto flex h-[calc(100svh-11rem)] min-h-[25rem] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[calc(100svh-11.5rem)] lg:h-[calc(100svh-4rem)]"
        >
          <header className="flex min-h-[4.75rem] items-center gap-3 border-b border-slate-100 px-4 sm:px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LuHash size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">{room}</h1>
              <p className="mt-0.5 text-xs text-slate-500">A shared space for your conversation</p>
            </div>
            <button
              type="button"
              onClick={() => setRoom(null)}
              className="ml-auto inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:ml-0 sm:text-sm"
              aria-label="Back to rooms"
            >
              <IoArrowBackOutline size={16} aria-hidden="true" />
              <span className="hidden sm:inline">All rooms</span>
            </button>
          </header>
          <ChatConversation room={room} />
          <Chat room={room} />
        </section>
      ) : (
        <div className="mx-auto w-full max-w-6xl">
          <header className="mb-8 mt-2 sm:mb-10">
            <p className="text-sm font-semibold text-indigo-600">YOUR WORKSPACE</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Good to see you{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Pick up a conversation or start a new one. Your rooms are just a click away.
            </p>
          </header>
          <ChatSelect />
        </div>
      )}
    </main>
  );
}

export default WrappedMainPaige
