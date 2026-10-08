"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useInquiryStore } from '../../../_data/store/useInquiryStore';
import ButtonAdminClose from '@/app/admin/_components/buttons/ButtonAdminClose';
import HeadingSecondary from '@/app/admin/_components/headings/HeadingSecondary';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import SelectAdminDefault from '@/app/admin/_components/forms/selects/SelectAdminDefault';
import { ButtonAdminSubmit } from '@/app/admin/_components/buttons/ButtonAdminSubmit';
import { toast } from 'react-toastify';
import { _inquiryStatusUpdateAction } from '@/app/admin/_data/actions/InquiryActions';
import { InquiryStatusData } from '@/app/admin/_data/sample/InquiryStatusData';
import TextInputDefault from '@/app/admin/_components/forms/inputs/TextInputDefault';
import TextAreaInputDefault from '@/app/admin/_components/forms/textareas/TextAreaInputDefault';
import SelectAdminOne from '@/app/admin/_components/forms/selects/SelectAdminOne';



const title = "Edit Inquiry"
const ERROR_MESSAGE = "Something went wrong, please try again."


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


interface PropInterface {
    id: string | number
    servicesData: any

}


export default function InquiryEditModal({ id, servicesData }: PropInterface) {
    const {
        data,
        toggleModal,
        isSubmitting,
        errors,
        servicesList,
        selectedService,
        setServicesList,
        setSelectedService,
        clearErrors,
        setInputValue,
        setToggleModal,
        setIsSubmitting,
        validateForm,
        getData,
    } = useInquiryStore()

    useEffect(() => {
        if (servicesData?.data) {
            setServicesList(servicesData?.data)
        }
    }, [servicesData?.data])

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
            const firstError = validation.errors.customerName ||
                validation.errors.customerPhone ||
                validation.errors.customerEmail ||
                validation.errors.message
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            status: data.status
        }
        try {
            const res = await _inquiryStatusUpdateAction(id, formData);
            console.log('response::;', res)
            const { status, message } = res;
            switch (status) {
                case 1:
                    toast.success(message);
                    await getData(id);
                    clearErrors();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    return
                default:
                    toast.warn(ERROR_MESSAGE);
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error(ERROR_MESSAGE);
            console.error('Form submission error:', error);
            setIsSubmitting(false);
            return
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


                                <SelectAdminDefault
                                    label='Status'
                                    name='status'
                                    data={InquiryStatusData}
                                    value={data.status}
                                    onChange={setInputValue}
                                    error={errors.status}
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