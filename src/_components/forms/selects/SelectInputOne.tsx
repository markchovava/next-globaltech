"use client"
import IconDefault from '@/_components/icons/IconDefault'
import { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"

const defaultList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

interface DataInterface {
    toggle: boolean
    current: string | number
    list: (string | number)[]
}

interface Props {
    label?: string
    dbData: string[] | number[]
    onChange: (i: string | number) => void
}

export default function SelectInputOne({ onChange, dbData, label = '' }: Props) {
    const [data, setData] = useState<DataInterface>({
        toggle: false,
        current: '',
        list: defaultList
    })

    const handleToggle = () => {
        setData(prev => ({ ...prev, toggle: !prev.toggle }))
    }

    const handleSelect = (i: string | number) => {
        setData(prev => ({ ...prev, current: i, toggle: false }))
        onChange(i)
    }

    return (
        <>
            <p className='mb-1 text-sm'>{label}</p>
            <div className='w-full relative'>
                <button
                    onClick={handleToggle}
                    className='w-full rounded-lg border border-gray-300 p-2 cursor-pointer flex items-center justify-between gap-3'
                >
                    <span>{data.current ? data.current : 'Select'}</span>
                    <motion.div
                        animate={{ rotate: data.toggle ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex items-center justify-center"
                    >
                        <IconDefault type='up' />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {data.toggle && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className={`cursor-pointer absolute h-50 overflow-y-auto sidebar__scroll 
                            z-50 bg-white drop-shadow w-full rounded-lg overflow-hidden mt-1`}>
                            {dbData.map((i, key) => (
                                <li
                                    key={key}
                                    onClick={() => handleSelect(i)}
                                    className={`px-2 py-1 hover:bg-gray-100 transition__effect 
                                    ${i === data.current ? 'bg-gray-100' : ''}`} >
                                    {i}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}