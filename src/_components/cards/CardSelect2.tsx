"use client"

import SelectInputOne2 from "../forms/selects/SelectInputOne2"
import { motion } from "motion/react"

interface Props {
    name: string
    css: string
    label1?: string
    label2?: string
    value1: string | number // <-- Added value1
    value2: string | number // <-- Added value2
    data: number[] | string[]
    onChange1: (i: string | number) => void
    onChange2: (i: string | number) => void
}

export default function CardSelect2({
    name,
    css,
    onChange1,
    onChange2,
    label1 = '',
    label2 = '',
    value1,
    value2,
    data
}: Props) {
    return (
        <div className={`${css} relative p-4 bg-white drop-shadow rounded-xl`}>
            <button type="button" className='cursor-pointer w-full mb-3 flex items-center justify-between'>
                <span>{name}</span>
            </button>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='grid grid-cols-2 gap-3'>
                <div>
                    <SelectInputOne2 value={value1} dbData={data} label={label1} onChange={onChange1} />
                </div>
                <div>
                    <SelectInputOne2 value={value2} label={label2} dbData={data} onChange={onChange2} />
                </div>
            </motion.div>
        </div>
    )
}