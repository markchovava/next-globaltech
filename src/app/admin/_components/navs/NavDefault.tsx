"use client"
import Link from "next/link"
import { AdminTopNavData } from "../../_data/sample/AdminTopNavData"
import IconDefault from "@/_components/icons/IconDefault"
import { useState } from "react"
import { AuthTokenCookieName, removeTheCookie, UserCookieName } from "@/_cookie/CookiesClient"
import { _logoutAction } from "../../(auth)/_data/actions/AuthActions"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../../(auth)/_store/useAuthStore"
import { toast } from "react-toastify"

export default function NavDefault() {
    const router = useRouter()
    const { 
        isSubmitting, 
        resetData, 
        setAuthToken, 
        setIsSubmitting,
    } = useAuthStore()
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (index: number, hasItems: boolean) => {
        if (!hasItems) {
            setOpenIndex(null)
            return
        }
        setOpenIndex(prev => (prev === index ? null : index))
    }


    const handleLogout = async () => {
        if(isSubmitting) {
            return
        }

        setIsSubmitting(true)
        try {
            const res = await _logoutAction();
            console.log('LOGOUT res:: ', res)
            const {message, status} = res
            switch(status){
                case 1:
                    await removeTheCookie(AuthTokenCookieName)
                    await removeTheCookie(UserCookieName)
                    setAuthToken("")
                    resetData()
                    router.replace('/admin/login')
                    toast.success(message)
                    return
                default:
                    toast.warn('Something went wrong, try again.')
                    return
            }
        } catch (error) {
            toast.error('Failed to logout. Please try again.');
            console.error('Logout error:', error);
        } finally{
            setIsSubmitting(false)
        }
    }

    return (
        <ul className='flex items-center justify-end'>
            {AdminTopNavData.map((i, key) => (
                <li key={key} className='group relative border border-gray-200'>
                    <Link href={i.items.length > 0 ? "#" : i.href}>
                        <button
                            onClick={() => handleToggle(key, i.items.length > 0)}
                            className='px-3 py-2 cursor-pointer group-hover:bg-gray-100 flex items-center gap-1 text-sm font-medium'
                        >
                            <IconDefault type={i.iconType} css='text-2xl text-blue-800' />
                            {i.name}
                            {i.items.length > 0 &&
                                <IconDefault type='down' css='text-lg' />}
                        </button>
                    </Link>

                    {i.items.length > 0 && (
                        <ul className={`bg-white rounded-b-lg overflow-hidden right-0 w-[150%] top-[105%] absolute z-10 drop-shadow
                            transition-all duration-200 ease-in-out
                            ${openIndex === key
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-1 pointer-events-none'
                            }`}>
                            {i.items.map((a, aKey) => (
                                <Link key={aKey} href={a.href}>
                                    <li className="cursor-pointer text-sm hover:bg-gray-100 p-1 border-b border-gray-300">
                                        {a.name}
                                    </li>
                                </Link>
                            ))}
                            <li onClick={handleLogout} className="cursor-pointer text-sm hover:bg-gray-100 p-1 border-b border-gray-300">
                                Logout
                            </li>
                        </ul>
                    )}
                </li>
            ))}

            
        </ul>
    )
}