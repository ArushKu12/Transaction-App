"use client"

import { useSession } from "next-auth/react";



export default function Home() : JSX.Element {
  const session = useSession()
  return (
    <div className="text-2xl">
      Hi Paytm 
    </div>
  );
}
