"use client"

import { GoDotFill } from "react-icons/go"
import { IoSearch } from "react-icons/io5"


interface PropInterface{
    type: "submit" | "reset" | "button" | undefined
    status: boolean

}

export default function ButtonAdminSearch({
    type,
    status
}: PropInterface) {

  return (
    <button 
        type={type}
        disabled={status}
        className="group px-4 border-l border-gray-300 rounded-r-full">
        { status ? 
            <GoDotFill className="cursor-pointer text-xl sm:text-2xl animate-pulse text-gray-900" />
        :
            <IoSearch className="cursor-pointer text-lg sm:text-xl text-gray-500 transition-all ease-initial duration-200 group-hover:text-gray-900 group-hover:scale-110" />
        }
    </button>
  )
}
