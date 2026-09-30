"use client"
import Link from 'next/link'
import IconDefault from '../icons/IconDefault'



interface Props {
    href: string
    name: string
}
export default function NewsItem({
    name,
    href
}: Props) {

    return (
        <>
            <Link href={href}>
                <li className='flex items-start justify-start gap-2 font-serif transition__effect cursor-pointer text-xl hover:text-sky-600 hover:underline'>
                    <IconDefault type='right' css='mt-1.5' /> {name}
                </li>
            </Link>
        </>
    )
}
