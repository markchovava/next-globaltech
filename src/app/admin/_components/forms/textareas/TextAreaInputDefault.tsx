"use client"

interface PropInterface {
    label?: string
    name: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error?: string,
}

export default function TextAreaInputDefault({
    label,
    name,
    value,
    placeholder,
    onChange,
    error = "",
}: PropInterface) {

    return (
        <div className='w-full'>
            <p className='mb-1 text-xs font-light'>{label}:</p>
            <textarea
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full h-32 px-3 py-2 rounded-lg outline-none border border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all'
            ></textarea>
            {error && <p className="text-sm font-light text-red-500">{error}</p>}
        </div>
    )

}