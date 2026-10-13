"use client"

import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ButtonAdminClose from '@/app/admin/_components/buttons/ButtonAdminClose';
import HeadingSecondary from '@/app/admin/_components/headings/HeadingSecondary';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import TextInputDefault from '@/app/admin/_components/forms/inputs/TextInputDefault';
import SelectAdminDefault from '@/app/admin/_components/forms/selects/SelectAdminDefault';
import { ButtonAdminSubmit } from '@/app/admin/_components/buttons/ButtonAdminSubmit';
import { toast } from 'react-toastify';
import { _eventUpdateAction } from '../../../_data/actions/EventActions';
import { useEventStore } from '@/app/admin/_data/store/useEventStore';
import { listNumbers } from '@/_utils/formatNumber';
import RichTextEditor from '@/app/admin/_components/forms/editors/RichTextEditor';
import { StatusData } from '@/app/admin/_data/sample/StatusData';




const title = "Edit Event"
const errorMessage = "Something went wrong, please try again."

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
}


export default function EventEditModal({ id }: PropInterface) {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        getData,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useEventStore()

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
            const firstError =
                validation.errors.name ||
                validation.errors.desc;
            toast.warn(firstError);
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('name', data.name ?? '')
        formData.append('venue', data.venue ?? '')
        formData.append('status', data.status ?? '')
        formData.append('date', data.date ?? '')
        formData.append('priority', String(data.priority ?? ''))
        formData.append('desc', data.desc ?? '')

        try {
            const res = await _eventUpdateAction(id, formData);
            const { status, message } = res;
            switch (status) {
                case 1:
                    await getData(id);
                    clearErrors();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message);
                    return
                default:
                    toast.success(errorMessage);
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
                                    label='Name'
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    placeholder='Enter the event name...'
                                    onChange={setInputValue}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <div className='grid grid-cols-2 gap-4'>
                                    <TextInputDefault
                                        label='Date'
                                        name='date'
                                        type="date"
                                        value={data.date}
                                        placeholder='Enter the date...'
                                        onChange={setInputValue}
                                        error={errors.date}
                                    />
                                    <TextInputDefault
                                        label='Venue'
                                        name='venue'
                                        type="text"
                                        value={data.venue}
                                        placeholder='Enter the venue...'
                                        onChange={setInputValue}
                                        error={errors.venue}
                                    />
                                </div>
                                <SpacerPrimary />

                                <SelectAdminDefault
                                    label='Status'
                                    name='status'
                                    data={StatusData}
                                    value={data.status}
                                    onChange={setInputValue}
                                    error={String(errors.status ?? '')}
                                />
                                <SpacerPrimary />

                                <RichTextEditor
                                    label="Description"
                                    name="desc"
                                    value={data.desc}
                                    placeholder="Enter the description..."
                                    onChange={setInputValue}
                                    error={errors.desc}
                                />

                                <SelectAdminDefault
                                    label='Priority'
                                    name='priority'
                                    data={listNumbers(7)}
                                    value={data.priority}
                                    onChange={setInputValue}
                                    error={String(errors.priority ?? '')}
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