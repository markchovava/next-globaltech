"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useInquiryStore } from '../../_data/store/useInquiryStore';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import TextAreaInputDefault from '../../_components/forms/textareas/TextAreaInputDefault';
import { _inquiryStoreAction } from '../../_data/actions/InquiryActions';
import SelectAdminDefault from '../../_components/forms/selects/SelectAdminDefault';
import { InquiryStatusData } from '../../_data/sample/InquiryStatusData';
import SelectAdminOne from '../../_components/forms/selects/SelectAdminOne';




const title = "Add Inquiry"
const errorMessage = 'Something went wrong, please try again.'

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

interface Props {
    servicesData: any
}


export default function InquiryAddModal({ servicesData }: Props) {
    const {
        data,
        toggleModal,
        isSubmitting,
        errors,
        servicesList,
        selectedService,
        setServicesList,
        setSelectedService,
        resetData,
        clearErrors,
        setInputValue,
        setToggleModal,
        setIsSubmitting,
        validateForm,
        getDataList,
    } = useInquiryStore()

    useEffect(() => {
        if (servicesData?.data) {
            setServicesList(servicesData?.data)
        }
        resetData()
    }, [resetData, servicesData?.data])

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
        //console.log('data', data)
        setIsSubmitting(true);
        const formData = {
            serviceName: selectedService.name,
            serviceId: selectedService.id,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail,
            customerAddress: data.customerAddress,
            message: data.message,
            status: 'Unread',
        }
        try {
            const res = await _inquiryStoreAction(formData);
            const { status, inquiry } = res;
            switch (status) {
                case 1:
                    clearErrors();
                    await getDataList();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(inquiry);
                    resetData();
                    return
                default:
                    toast.error(errorMessage);
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error(errorMessage);
            console.error('Form submission error:', error);
            setIsSubmitting(false);
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
                                    label='Customer Name'
                                    name='customerName'
                                    type="text"
                                    value={data.customerName}
                                    placeholder='Enter your Customer Name...'
                                    onChange={setInputValue}
                                    error={errors.customerName}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Phone'
                                    name='customerPhone'
                                    type="text"
                                    value={data.customerPhone}
                                    placeholder='Enter your Customer Phone...'
                                    onChange={setInputValue}
                                    error={errors.customerPhone}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Email'
                                    name='customerEmail'
                                    type="text"
                                    value={data.customerEmail}
                                    placeholder='Enter your Customer Email...'
                                    onChange={setInputValue}
                                    error={errors.customerEmail}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Address'
                                    name='customerAddress'
                                    type="text"
                                    value={data.customerAddress}
                                    placeholder='Enter your Customer Address...'
                                    onChange={setInputValue}
                                    error={errors.customerAddress}
                                />
                                <SpacerPrimary />

                                <TextAreaInputDefault
                                    label='Message:'
                                    name='message'
                                    value={data.message}
                                    placeholder='Enter your Inquiry.'
                                    onChange={setInputValue}
                                    error={errors.message}
                                />
                                <SpacerPrimary />


                                <SelectAdminOne
                                    label='Service'
                                    name='service'
                                    placeholder='Select a service'
                                    data={servicesList}
                                    value={selectedService.id}
                                    onChange={(e) => {
                                        const id = e.target.value
                                        const service = servicesList.find((s) => String(s.value) === id)
                                        setSelectedService(id, service?.label ?? '')
                                    }}
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