"use client"

import { useState } from "react"
import SelectInputOne from "../forms/selects/SelectInputOne"
import IconDefault from "../icons/IconDefault"
import { AnimatePresence, motion } from "motion/react"
import SelectInputOne2 from "../forms/selects/SelectInputOne2"


interface Props {
    name: string
    css: string
    label1?: string
    label2?: string
    data: number[] | string[]
    onChange1: (i: string | number) => void
    onChange2: (i: string | number) => void
}

export default function CardSelect({
    name,
    css,
    onChange1,
    onChange2,
    label1 = '',
    label2 = '',
    data
}: Props) {
    const [toggle, setToggle] = useState<boolean>(true)


    return (
        <div className={`${css} relative p-4 bg-white drop-shadow rounded-xl`}>
            <button className='cursor-pointer w-full mb-3 flex items-center justify-between'>
                <span>{name}</span>
            </button>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='grid grid-cols-2 gap-3'>
                <div>
                    <SelectInputOne dbData={data} label={label1} onChange={onChange1} />
                </div>
                <div>
                    <SelectInputOne label={label2} dbData={data} onChange={onChange2} />
                </div>
            </motion.div>

        </div>
    )
}
