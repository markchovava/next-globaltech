"use client"

import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import TextInputDefault from "@/app/admin/_components/forms/inputs/TextInputDefault"
import HeadingSecondary from "@/app/admin/_components/headings/HeadingSecondary"
import LogoAdmin from "@/app/admin/_components/logos/LogoAdmin"
import { useAuthStore } from "../../_store/useAuthStore"
import TextInputPassword from "@/app/admin/_components/forms/inputs/TextInputPassword"
import { ButtonAdminSubmit } from "@/app/admin/_components/buttons/ButtonAdminSubmit"
import Link from "next/link"
import { useEffect } from "react"



const title = "Forgot Password"


export default function ForgotPasswordPage() {
    const {
        data, 
        resetData,
        setInputValue, 
        isSubmitting, 
        setIsSubmitting
    } = useAuthStore()

    useEffect(() => {
        resetData();
    }, []);


  return (
    <>
     <section className='mx-auto w-[50%] mt-16 mb-20 py-8 px-5 bg-white drop-shadow-lg rounded-lg'> 
        <div className="flex items-center justify-center">
            <LogoAdmin />
        </div>
        <SpacerPrimary />
        <hr className="w-full border-b border-gray-100" />
        <SpacerPrimary />
        <HeadingSecondary title={title} css='text-center' />
        <SpacerPrimary />

        <TextInputDefault
            label='Email' 
            name='email' 
            type="text"
            value={data.email} 
            placeholder='Enter Email here.'
            onChange={setInputValue} 
        />
        <SpacerPrimary />
        <SpacerPrimary />

        <div className='flex items-center justify-center'>
            <ButtonAdminSubmit
                title='Submit' 
                css='px-12 text-white py-4' 
                status={isSubmitting} 
            />
        </div>
       
        <SpacerPrimary />
        <p className="text-sm text-center text-gray-800">
            Don't have an account? 
            <Link href="/admin/register" className="underline hover:no-underline ml-1">Register here.</Link>
        </p>
        <SpacerPrimary />
       
      



       
        
    </section>
    </>
  )
}
