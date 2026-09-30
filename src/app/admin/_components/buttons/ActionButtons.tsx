"use client"
import IconDefault from '@/_components/icons/IconDefault'
import Link from 'next/link'


interface PropInterface{
    viewHref: string
    onDelete: () => void
}

export default function ActionButtons({
    viewHref, 
    onDelete
}: PropInterface) {

    const handleDelete = () => {
        if (window.confirm("Are you sure?")) {
            onDelete();
        }
    };

  return (
    <div className='flex items-center justify-center gap-2'>
        <Link href={viewHref}>
            <IconDefault
                type='eye' 
                css={`cursor-pointer text-2xl hover:scale-110 hover:text-blue-700 ease-initial 
                transition-all duration-200`} />
        </Link>
        <button onClick={handleDelete}>
            <IconDefault 
                type='delete' 
                css={`cursor-pointer text-xl hover:scale-110 hover:text-red-700 ease-initial 
                transition-all duration-200`} />
        </button>
    </div>
  )
}
