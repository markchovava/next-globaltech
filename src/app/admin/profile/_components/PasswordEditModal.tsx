"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import { useProfileStore } from '../../_data/store/useProfileStore';
import TextInputPassword from '../../_components/forms/inputs/TextInputPassword';
import { _passwordUpdateAction } from '../../_data/actions/ProfileActions';
import { useRouter } from 'next/navigation';



const title = "Edit Password"


const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }
    },
}


export default function PasswordEditModal() {
    const router = useRouter()
    const {
        data,
        errors,
        togglePasswordModal,
        isSubmitting,
        setError,
        resetPassword,
        setInputValue,
        setTogglePasswordModal,
        clearErrors,
        setIsSubmitting,
        validatePasswordForm,
        getData,
        setToggleModal,
    } = useProfileStore()


    useEffect(() => {
        resetPassword();
    }, [])

    const handleToggleModal = () => {
        setTogglePasswordModal(!togglePasswordModal)
    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();
        // Validate form using store
        const validation = validatePasswordForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.password ||
                validation.errors.passwordConfirm;
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            password: data.password,
        }
        console.log('formData: ', formData)
        try {
            const res = await _passwordUpdateAction(formData);
            console.log('res', res)

            const { status, message, data } = res
            switch (status) {
                case 2:
                    toast.warn(message);
                    setIsSubmitting(false);
                    router.push('/admin/login')
                    return
                case 1:
                    toast.success(message);
                    clearErrors();
                    setIsSubmitting(false);
                    await getData();
                    setToggleModal(false)
                    return
                case 0:
                    toast.warn(message);
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
        }
    }


    return (
        <AnimatePresence>
            {togglePasswordModal && (
                <motion.section
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={`w-screen h-screen fixed top-0 left-0 z-200 overflow-y-auto`}>
                    <div className='absolute z-0 top-0 left-0 w-full h-full bg-black opacity-40'></div>
                    <div className='w-full h-full absolute z-10 overflow-auto scroll__width py-24'>
                        <section className='mx-auto lg:w-[60%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                            <div className='flex items-center justify-end'>
                                <ButtonAdminClose onClick={handleToggleModal} />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <HeadingSecondary title={title} css='text-center' />
                                <SpacerPrimary />
                                <hr className="w-full border-b border-gray-100" />
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
                                    placeholder="Enter Confirm Password here."
                                    name="passwordConfirm"
                                    value={data.passwordConfirm}
                                    onChange={setInputValue}
                                    error={errors.passwordConfirm}
                                />
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
                        </section>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}