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
import { loginAction } from "../../_data/actions/AuthActions"
import { AuthTokenCookieName, setTheCookie, UserCookieName } from "@/_cookie/CookiesClient"
import { useRouter } from "next/navigation"



const title = "Login"


export default function LoginPage() {
    const router = useRouter()
    const {
        data,
        isSubmitting,
        errors,
        resetData,
        setInputValue,
        setIsSubmitting,
        clearErrors,
        validateLoginForm,
        setData,
        setAuthToken,
        setError,
    } = useAuthStore()

    useEffect(() => {
        resetData();
        clearErrors();
    }, []);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        if (isSubmitting) { return }
        // Validate form using store
        const validation = validateLoginForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.email || validation.errors.password
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            email: data.email,
            password: data.password,
        }
        try {
            const res = await loginAction(formData);
            const { status, message, authToken, data } = res
            switch (status) {
                case 0:
                    toast.warn(message);
                    setError('email', message)
                    setIsSubmitting(false);
                    return
                case 1:
                    await setTheCookie(AuthTokenCookieName, authToken)
                    await setTheCookie(UserCookieName, data)
                    router.push('/admin')
                    toast.success(message);
                    clearErrors();
                    setAuthToken(authToken)
                    //setData(data)
                    setIsSubmitting(false);
                    return
                case 2:
                    toast.warn(message);
                    setError('password', message)
                    setIsSubmitting(false);
                    return
                default:
                    toast.success('Something went wrong, please try again.');
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
            setIsSubmitting(false);
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
                    <p className="text-sm text-end text-gray-800">
                        <Link className="underline hover:no-underline ml-1" href="/admin/forgot-password">
                            Forgot password?
                        </Link>
                    </p>
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
                    Don't have an account?
                    <Link href="/admin/register" className="underline hover:no-underline ml-1">Register here.</Link>
                </p>
                <SpacerPrimary />







            </section>
        </>
    )
}
