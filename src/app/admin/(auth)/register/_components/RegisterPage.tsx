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
import { toast } from "react-toastify"
import { registerAction } from "../../_data/actions/AuthActions"
import { useRouter } from "next/navigation"
import { error } from "console"



const title = "Register"


export default function RegisterPage() {
    const router = useRouter()
    const {
        data, 
        isSubmitting, 
        errors,
        setInputValue, 
        resetData,
        clearErrors,
        setIsSubmitting,
        validateRegisterForm,
    } = useAuthStore()

    useEffect(() => {
        resetData();
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();
        e.preventDefault();
        // Clear previous errors
        clearErrors();
        // Validate form using store
        const validation = validateRegisterForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.email || 
                validation.errors.password ||
                validation.errors.passwordConfirm
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            email: data.email,
            password: data.password,
        }
        try {
            const res = await registerAction(formData);
            const {message, status} = res;
            switch(status){
                case 1:
                    toast.success(message);
                    clearErrors();
                    resetData();
                    router.push('/admin/login')
                    setIsSubmitting(false);
                    return
                case 0:
                    toast.warn(message);
                    setIsSubmitting(false);
                    return
                default:
                    toast.warn("Something went wrong, please try again.")
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
        } 
    }


  return (
    <>
     <section className='mx-auto lg:w-[50%] w-[86%] mt-16 mb-20 py-8 px-5 bg-white drop-shadow-lg rounded-lg'> 
        <div className="flex items-center justify-center">
            <LogoAdmin />
        </div>
        <SpacerPrimary />
        <hr className="w-full border-b border-gray-100" />
        <SpacerPrimary />
        <HeadingSecondary title={title} css='text-center' />
        <SpacerPrimary />

        <form onSubmit={handleSubmit}> 
            <TextInputDefault
                label='Email' 
                name='email' 
                type="text"
                value={data.email} 
                placeholder='Enter Email here.'
                onChange={setInputValue} 
                error={errors.email}
            />
            <SpacerPrimary />

            <TextInputPassword 
                label="Password" 
                placeholder="Enter Password here."
                name="password" 
                value={data.password} 
                onChange={setInputValue} 
                error={errors.password}
            />
            <SpacerPrimary />

            <TextInputPassword 
                label="Confirm Password" 
                placeholder="Enter Password here."
                name="passwordConfirm" 
                value={data.passwordConfirm} 
                onChange={setInputValue} 
                error={errors.passwordConfirm}
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

        </form>
         
        <p className="text-sm text-center text-gray-800">
            Alright have an account? 
            <Link href="/admin/login" className="underline hover:no-underline ml-1">Login here.</Link>
        </p>
        <SpacerPrimary />

       
        
    </section>
    </>
  )
}
