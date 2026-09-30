"use client"

import IconDefault from "@/_components/icons/IconDefault"
import Link from "next/link"

interface PropInterface {
    id: string | number
    href: string
    css: string
    iconType: string
    name: string
}


export default function CardAdmin(
  { data }: 
  {data: PropInterface} ) {
    const {id, css, href, iconType, name} = data
  return (
    <Link key={id} href={href}>
        <div className={`text-white cursor-pointer ${css} hover:drop-shadow-lg
            overflow-hidden rounded-xl  p-4 flex items-center justify-start gap-3`}>
            <IconDefault css="text-5xl" type={iconType} />
            <p className="text-2xl border-l border-gray-200 pl-3">{name}</p>
        </div>
    </Link>
  )
}
