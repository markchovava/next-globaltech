import IconDefault from '@/_components/icons/IconDefault'
import Link from 'next/link'



export default function LogoAdmin() {
  return (
    <>
    <Link href="/admin">
        <div className='flex items-center justify-start gap-2'>
            <IconDefault 
                type='mount' 
                css='text__primary text-5xl' />
            <h3 className='text-4xl font-light'>
                Bako <span className='text__primary font-extrabold'>CMS</span>
            </h3>
        </div>
    </Link>
    </>
  )
}
