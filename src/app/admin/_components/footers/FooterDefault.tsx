import Link from 'next/link'
import React from 'react'
import { AdminFooterNavData } from '../../_data/sample/AdminFooterNavData'

export default function FooterDefault() {
  return (
    <footer className='bg__secondary pt-8 pb-6'>
        <div className='container__primary flex lg:flex-row flex-col gap-3 items-center justify-between text-sm font-medium'>
            <ul className='flex items-center justify-start gap-4 text-gray-300'>
                {AdminFooterNavData.map((i, key) => (
                    <Link key={key} href={i.href}>
                    <li className='hover:underline '>{i.name}</li>
                    </Link>
                ))}
            </ul>
            <p className='text-gray-300'>
                Developed and maintianed by 
                <Link href="#" className='ml-2 underline text-blue-100 hover:no-underline italic'>
                    FL Designers
                </Link>.
            </p>
        </div>
    </footer>
  )
}
