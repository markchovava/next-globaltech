"use client"
import { ReactNode } from 'react'
import IconDefault from '../icons/IconDefault'


interface Props {
    iconType: string
    name: string | ReactNode
}

export default function CardIcon({ iconType, name }: Props) {
    return (
        <div className="w-full flex items-start justify-start gap-1.5">
            <IconDefault type={iconType} css="mt-1 text-lg" />
            <div>{name}</div>
        </div>
    )
}
