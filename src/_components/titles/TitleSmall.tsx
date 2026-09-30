"use client"

import { MontserratSemiBold } from "@/_assets/fonts/montserrat/_MontserratFont"


interface Props {
    name: string
}


export default function TitleSmall({ name }: Props) {
    return (
        <>
            <div className="flex justify-start items-center gap-2">
                <span className={`uppercase tracking-wider text-sm ${MontserratSemiBold.className}`}>
                    {name}
                </span>
                <span className="flex-1 w-full h-0.5 bg-sky-300"></span>
            </div>
        </>
    )
}
