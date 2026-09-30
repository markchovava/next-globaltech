"use client"

import Link from "next/link"
import IconDefault from "./IconDefault"



interface Props {
    href: string
    iconType: string
}

export default function IconLink({ iconType, href }: Props) {
    return (
        <Link href={href} className="group">
            <IconDefault type={iconType} css={`text-3xl text-white group-hover:scale-110 
                transition__effect`} />
        </Link>
    )
}
