"use client"

import React from "react"
import {usePathname, useRouter} from "next/navigation"

export const SidebarItem = ({href,title,icon}:{href:string,title:string,icon:React.ReactNode}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href

    return (
        <div className={`flex cursor-pointer pl-[1rem] py-[0.4rem] ${selected ? "text-[#6a51a6]" : "text-slate-500"}`} onClick={() => {
            router.push(href)
        }}>
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </div>
    )
}