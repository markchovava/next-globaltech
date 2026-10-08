"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import SelectAdminDefault from '../../_components/forms/selects/SelectAdminDefault';
import ImageInputDefault from '../../_components/forms/image/ImageInputDefault';
import { _eventStoreAction } from '../../_data/actions/EventActions';
import { useEventStore } from '../../_data/store/useEventStore';
import { listNumbers } from '@/_utils/formatNumber';
import RichTextEditor from '../../_components/forms/editors/RichTextEditor';
import { StatusData } from '../../_data/sample/StatusData';



const title = "Add Event"
const ERROR_MESSAGE = "Something went wrong, please try again."

const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { type: 'spring', duration: 1 },
    },
}

export default function EventAddModal() {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        getDataList,
        resetData,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useEventStore()

    // Reset the form every time the modal is opened, not just on first mount
    useEffect(() => {
        if (toggleModal) {
            resetData()
        }
    }, [toggleModal, resetData])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();          // must come first
        if (isSubmitting) return;    // prevent double submits
        clearErrors();

        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first available error, with a fallback so the toast is never empty
            const firstError =
                (Object.values(validation.errors).find(Boolean) as string | undefined) ||
                ERROR_MESSAGE;
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
            const res = await _eventStoreAction(formData);
            console.log('Event Add Response:', res);  // Debugging line
            const { status, message } = res;
            switch (status) {
                case 1:
                    await getDataList();
                    clearErrors();
                    resetData();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message);
                    return
                case 0:
                    setIsSubmitting(false);
                    toast.warn(message)
                    return
                default:
                    toast.warn(ERROR_MESSAGE);
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error(ERROR_MESSAGE);
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
                    className='w-screen h-screen fixed top-0 left-0 z-[200] overflow-y-auto'>
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