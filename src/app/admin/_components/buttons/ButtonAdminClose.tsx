"use client"
import { IoClose } from 'react-icons/io5'


interface PropsInterface{
    onClick: () => void
}

export default function ButtonAdminClose({ onClick }: PropsInterface) {
  return (
    <>
    <button 
        onClick={onClick} 
        className='cursor-pointer hover:text-red-600 transition-all ease-in-out duration-200'>
        <IoClose className='text-3xl' />
    </button>
    </>
  )
}