"use client"

import IconDefault from "@/_components/icons/IconDefault"


interface PropInterface{
    label?: string
    iconType: string
    type: string
    placeholder: string
    name: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export default function TextInputTwo({
    label,
    iconType,
    type,
    placeholder,
    name,
    value,
    onChange,
    error,
}: PropInterface) {
  return (
    <div className='w-full'>
        <p className='text-gray-700 text-xs font-medium mb-1'>{label}</p>
        <div className='border border-gray-300 rounded-full flex items-center justify-start h-12 px-3'>
            <IconDefault type={iconType} css='text-xl text-gray-700' />
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder} 
                className='outline-none flex-1 bg-transparent px-3 text-sm' />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}
