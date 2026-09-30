import IconDefault from "@/_components/icons/IconDefault"
import Link from "next/link"


interface PropsInterface{
    id: string | number
    name: string
    href: string
}

export default function BreadCrumbDefault(
    { data }: 
    { data: PropsInterface[] }
) {

  return (
   
    <ul className='container__primary border-b border-gray-200 py-1 text-sm text-gray-900 flex items-center justify-start gap-2'>
        { data.map((i, key) => (
            key < data.length-1 ?
            <Link key={key} href={i.href}>
                <li className='flex items-center justify-start gap-2'>
                    {i.name} 
                    <IconDefault type='right' css='text-sm' />
                </li>
            </Link>
            :
            <Link key={key} href={i.href}>
                <li className='flex items-center justify-start gap-2 font-medium'>
                    {i.name} 
                </li>
            </Link>
        ))}
    </ul>
  
  )
}
