"use client"

import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import { useProfileStore } from '../../_data/store/useProfileStore';
import { _profileStoreAction } from '../../_data/actions/ProfileActions';



const title = "Edit Profile"


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


export default function ProfileEditModal() {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        setError,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
        getData,
    } = useProfileStore()

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name ||
                validation.errors.phone ||
                validation.errors.email
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
        }

        try {
            const res = await _profileStoreAction(formData);
            //console.log('res', res)
            const { status, message, data } = res
            switch (status) {
                case 2:
                    toast.warn(message);
                    setError('email', message)
                    setIsSubmitting(false);
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
            {toggleModal && (
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

                                <TextInputDefault
                                    label='Name'
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    placeholder='Enter your Name...'
                                    onChange={setInputValue}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Phone Number'
                                    name='phone'
                                    type="text"
                                    value={data.phone}
                                    placeholder='Enter your Phone Number.'
                                    onChange={setInputValue}
                                    error={errors.phone}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Email'
                                    name='email'
                                    type="text"
                                    value={data.email}
                                    placeholder='Enter your Email.'
                                    onChange={setInputValue}
                                    error={errors.email}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Address'
                                    name='address'
                                    type="text"
                                    value={data.address}
                                    placeholder='Enter your Address.'
                                    onChange={setInputValue}
                                    error={errors.address}
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