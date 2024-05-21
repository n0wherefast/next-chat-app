'use client'
import Auth from "./coponents/Auth";
 import { useGlobalContext } from "./context/context";
export default function Home() {
  const {user} = useGlobalContext()
  return (
    <main className=" w-full h-screen flex items-center justify-center bg-zinc-100">
      {
        !user ? <Auth/> : <div>Logged</div>
      }
      
    </main>
  );
}
