"use client"
import Link from 'next/link'
import ButtonTwo from '../buttons/ButtonTwo'
import Heading1 from '../headings/Heading1'



interface Props {
    name: string
    btnName?: string
    href?: string
}

export default function TitleOne({
    name,
    btnName = 'View More',
    href = '#'
}: Props) {
    return (
        <>
            <div className='flex items-center justify-between gap-8 border-b border-gray-400 pb-3'>
                <Heading1 name={name} />
                {href &&
                    <Link href={href}>
                        <ButtonTwo name={btnName} />
                    </Link>
                }
            </div>
        </>
    )
}
