"use client"
import { FaAngleRight } from "react-icons/fa6";


interface PropInterface{
    title?: string,
    iconCss?: string, 
    css?: string,
    status?: boolean
}

export function ButtonAdminSubmit({
    title="Button", 
    status,
    css="text-white px-6 py-3", 
    iconCss="",
  }: PropInterface
) {

  return (
    <>
    <button 
      disabled={status}
      type="submit"
      className={`${css} group bg-linear-to-br from-blue-500 to-blue-900 
        hover:bg-linear-to-br hover:from-blue-500 hover:to-blue-950
        hover:drop-shadow cursor-pointer flex items-center justify-center gap-1 rounded-full`}>
      <span 
        className='group-hover:-translate-x-1 translate-x-2 ease-in-out duration-400 transition-all'>
        {status ? "Processing" : title}
      </span>
      <FaAngleRight
        className={`${iconCss} group-hover:translate-x-1 text-transparent group-hover:text-white ease-in-out 
        duration-300 transition-all`} />
    </button>
    </>
  )
}