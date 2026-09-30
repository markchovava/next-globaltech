"use client"

import IconDefault from "@/_components/icons/IconDefault"
import { useState } from "react"


interface PropInterface{
    label: string
    value: string
    name: string
    error?: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function TextInputPassword({
    label, 
    name, 
    value,
    error,
    placeholder, 
    onChange}: PropInterface) {
    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="w-full">
        <p className="font-light mb-1">{label}</p>
        <div className="flex items-center justify-start border border-gray-200 hover:border-gray-500 rounded-lg overflow-hidden">
            <input 
            type={isOpen ? 'text' : 'password'}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder}
            className="flex-1 outline-none px-3 py-2 ease-initial" />
            <button 
                type="button" 
                className="px-3 cursor-pointer" onClick={handleIsOpen}>
                <IconDefault 
                    css="text-lg" type={isOpen ? 'eye' : 'eye-closed' } />
            </button>
        </div>
        { error &&
        <p className="text-sm text-red-600 font-light">
          {error}
        </p>
      }
    </div>
  )
}
