"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import ButtonAdminClose from '@/app/admin/_components/buttons/ButtonAdminClose';
import HeadingSecondary from '@/app/admin/_components/headings/HeadingSecondary';
import SpacerPrimary from '../spacers/SpacerPrimary';
import TextInputDefault from '@/app/admin/_components/forms/inputs/TextInputDefault';
import TextAreaInputDefault from '@/app/admin/_components/forms/textareas/TextAreaInputDefault';
import { useQuoteStore } from '@/_store/useQuoteStore';
import { MontserratBold } from '@/_assets/fonts/montserrat/_MontserratFont';
import Button from '../buttons/Button';


const title = "Service Request"


const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
}

const panelVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
    },
    exit: {
        opacity: 0,
        y: 16,
        scale: 0.98,
        transition: { duration: 0.15, ease: 'easeIn' },
    },
}

export default function QuoteModal() {
    const {
        data,
        toggleModal,
        isSubmitting,
        errors,
        offer,
        service,
        resetData,
        clearErrors,
        setInputValue,
        setToggleModal,
        setIsSubmitting,
        validateForm,
    } = useQuoteStore()

    useEffect(() => {
        resetData()
    }, [resetData])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();

        // Validate form using store validation logic
        const validation = validateForm();
        if (!validation.isValid) {
            const firstError = validation.errors.name ||
                validation.errors.phone ||
                validation.errors.email ||
                validation.errors.address
            toast.warn(firstError);
            return;
        }

        setIsSubmitting(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            message: data.message,
        }

        /* try {
            const res = await quoteStoreAction(formData);
            console.log('res', res)
            const { status, message } = res;
            switch (status) {
                case 1:
                    clearErrors();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message);
                    resetData();
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
        } */
    }

    return (
        <AnimatePresence>
            {toggleModal && (
                <motion.section
                    key="quote-modal"
                    variants={overlayVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className={`w-screen h-dvh fixed top-0 left-0 z-200`}>

                    {/* Background now fixed to the viewport, independent of scroll */}
                    <div className='fixed inset-0 z-0 bg-black opacity-40'></div>

                    {/* Only this element scrolls */}
                    <div className='relative w-full h-full z-10 overflow-y-auto scroll__width py-24'>
                        <motion.section
                            variants={panelVariants}
                            className='mx-auto lg:w-[60%] w-[90%] bg-white text-black p-6 rounded-xl'>
                            <div className='flex items-center justify-end'>
                                <ButtonAdminClose onClick={handleToggleModal} />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <HeadingSecondary title={title} css='text-center' />
                                <SpacerPrimary />
                                <hr className="w-full border-b border-gray-100" />
                                <SpacerPrimary />

                                <div className='bg-gray-50 mb-4 text-lg space-y-3'>
                                    {service.name &&
                                        <div className='text-cyan-700'>
                                            <p className='text-xs'> The Service: </p>
                                            <p className={`text-cyan-700 ${MontserratBold.className}`}>
                                                {service.name}
                                            </p>
                                        </div>
                                    }
                                    {service.desc &&
                                        <div>
                                            <p className={`text-xs`}>Description:</p>
                                            <div className={``}>{service.desc}</div>
                                        </div>
                                    }
                                </div>

                                <TextInputDefault
                                    label='Customer Name'
                                    name='customerName'
                                    type="text"
                                    value={data.name || ''}
                                    placeholder='Enter Customer Name.'
                                    onChange={setInputValue}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Phone'
                                    name='customerPhone'
                                    type="text"
                                    value={data.phone || ''}
                                    placeholder='Enter Phone Number here.'
                                    onChange={setInputValue}
                                    error={errors.phone}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Email'
                                    name='email'
                                    type="text"
                                    value={data.email || ''}
                                    placeholder='Enter Email Address here.'
                                    onChange={setInputValue}
                                    error={errors.email}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Address'
                                    name='address'
                                    type="text"
                                    value={data.address || ''}
                                    placeholder='Enter Address here.'
                                    onChange={setInputValue}
                                    error={errors.address}
                                />
                                <SpacerPrimary />

                                <TextAreaInputDefault
                                    label='Message'
                                    name='message'
                                    value={data.message || ''}
                                    placeholder='Write your Message here...'
                                    onChange={setInputValue}
                                    error={errors.message}
                                />
                                <SpacerPrimary />

                                <div className='flex items-center justify-center'>
                                    <Button
                                        type='submit'
                                        name='Submit'
                                        css='px-12 text-white py-4'
                                        status={isSubmitting}
                                    />
                                </div>
                                <SpacerPrimary />
                            </form>
                        </motion.section>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    )

}