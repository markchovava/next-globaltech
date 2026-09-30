"use client"

interface PropInterface {
  type?: string,
  label?: string
  name: string,
  value: string | number,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function TextInputDefault({
  type = "text",
  label,
  name,
  value,
  placeholder,
  onChange,
  error = ""
}: PropInterface) {

  return (
    <div className='w-full'>
      {label &&
        <p className='mb-1 text-xs font-light'>{label}:</p>
      }
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full px-3 py-2 rounded-lg outline-none border border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all' />
      {error &&
        <p className="text-xs text-red-600 font-light">
          {error}
        </p>
      }
    </div>
  )
}