"use client"

import IconDefault from "@/_components/icons/IconDefault"
import { useState } from "react"


interface Props{
    label?: string
    name: string
    value: string
    placeholder: string
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
}: Props) {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }
  return (
    <div className="mb-4">
        {label &&
          <p className="font-medium text-sm text-gray-700 mb-1">
            {label}:
          </p>
        }
        <div className="flex rounded-lg overflow-hidden items-center justify-start border border-gray-300 focus:border-gray-400 w-full">
            <input 
                type={show ? 'text' : 'password'}
                value={value}
                onChange={onChange} 
                name={name} 
                placeholder={placeholder}
                className=" outline-none flex-1 py-2 px-3" />
            <button onClick={handleShow} type="button" className="pr-2"> 
                <IconDefault 
                    type={show ? 'eye' : 'eye-closed'} 
                    css="" />
            </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
