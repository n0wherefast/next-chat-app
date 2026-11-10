'use client'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { LuArrowUpRight, LuMessagesSquare, LuShieldCheck, LuSparkles } from 'react-icons/lu'
import { useGlobalContext } from '../../context/context'

function WrappedAuth() {
  const { SignInWithGoogle, isSigningIn, authError } = useGlobalContext()

  return (
    <section className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
      <div className="order-2 mx-auto w-full max-w-xl lg:order-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
          <LuSparkles size={16} aria-hidden="true" />
          A little more human, a little less noise
        </p>
        <h1 className="mt-4 max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Good conversations start with <span className="text-indigo-600">showing up.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
          A simple place to meet, catch up, and keep the conversation going — one room at a time.
        </p>

        <div className="relative mt-10 max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:mt-12 sm:p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <LuMessagesSquare size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Room One</p>
              <p className="text-xs text-slate-400">A little preview</p>
            </div>
            <span className="ml-auto flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-50" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">A</span>
              <div>
                <p className="mb-1 text-[11px] font-semibold text-slate-500">Alex</p>
                <p className="rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700">Hey! How&apos;s everyone doing?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="max-w-[82%] rounded-2xl rounded-br-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white">Pretty good — glad to be here.</p>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 -top-5 hidden h-16 w-16 items-center justify-center rounded-2xl bg-amber-300 text-amber-950 shadow-lg shadow-amber-200/70 sm:flex">
            <LuSparkles size={24} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-md lg:order-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 sm:p-9">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <LuMessagesSquare size={20} aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900">Next Chat</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Welcome to Next Chat</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Let&apos;s get you in.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to find your rooms and join the conversation.</p>

          <button
            type="button"
            className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={SignInWithGoogle}
            disabled={isSigningIn}
            aria-busy={isSigningIn}
          >
            {!isSigningIn && <FcGoogle size={20} aria-hidden="true" />}
            {isSigningIn ? 'Signing in…' : 'Continue with Google'}
            {!isSigningIn && <LuArrowUpRight className="ml-auto text-slate-400" size={17} aria-hidden="true" />}
          </button>
          {authError && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" role="alert">
              {authError}
            </p>
          )}
          <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-400">
            <LuShieldCheck className="shrink-0 text-emerald-600" size={16} aria-hidden="true" />
            Your account is used only to sign you in.
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">Simple by design. Better together.</p>
      </div>
    </section>
  )
}

export default WrappedAuth
