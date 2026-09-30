import React from 'react'
import IconDefault from '../icons/IconDefault'


interface Props {
    name: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

export default function ButtonTwo({
    name,
    onClick = () => { },
    type = 'button'
}: Props) {
    return (
        <>
            <button type={type}
                onClick={onClick}
                className={`px-4 py-2 cursor-pointer rounded-full flex items-center 
                justify-center gap-2 bg-slate-700 text-white hover:bg-slate-800 
                transition-colors ease-in-out duration-300`}>
                {name}
                <IconDefault type="right" />
            </button>
        </>
    )
}
