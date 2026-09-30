"use client"

interface PropInterface{
    type: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInputAdminSearch({
    type, 
    value, 
    placeholder, 
    onChange
}: PropInterface) {

  return (
    <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className="flex-1 py-3 px-4 outline-none rounded-l-full" 
    />
  )
}
