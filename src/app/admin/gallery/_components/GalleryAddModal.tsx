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
import { useGalleryStore } from '../../_data/store/useGalleryStore';
import SelectAdminOne from '../../_components/forms/selects/SelectAdminOne';
import { _galleryStoreAction } from '../../_data/actions/GalleryActions';



const title = "Add Event"
const ERROR_MESSAGE = "Something went wrong, please try again."

const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { type: 'spring', duration: 1 },
    },
}

interface Props {
    eventsData?: any
}

export default function GalleryAddModal({
    eventsData
}: Props) {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        imageList,
        selectedEvent,
        eventList,
        getDataList,
        setEventList,
        resetData,
        setImage,
        setInputValue,
        setSelectedEvent,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
    } = useGalleryStore()

    // console.log('eventsData:: ', eventsData)

    useEffect(() => {
        if (toggleModal) {
            resetData()
        }
        if (eventsData?.data) {
            setEventList(eventsData?.data)
        }
    }, [toggleModal, resetData])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();          // must come first
        if (isSubmitting) return;    // prevent double submits
        clearErrors();

        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('eventId', String(selectedEvent.value))
        imageList.forEach((item) => {
            if (item.imageUpload) {
                formData.append('images[]', item.imageUpload)
            }
        })

        try {
            const res = await _galleryStoreAction(formData);
            console.log('Gallery Response:', res);  // Debugging line
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

                                <div className='grid grid-cols-3 gap-6'>
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(1, e)}
                                        error={errors.image}
                                    />
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(2, e)}
                                        error={errors.image}
                                    />
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(3, e)}
                                        error={errors.image}
                                    />
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(4, e)}
                                        error={errors.image}
                                    />
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(5, e)}
                                        error={errors.image}
                                    />
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={imageList[0].image}
                                        onChange={(e) => setImage(6, e)}
                                        error={errors.image}
                                    />
                                </div>
                                <SpacerPrimary />


                                <SelectAdminOne
                                    label='Event'
                                    name='event'
                                    placeholder='Select a Event'
                                    data={eventList}
                                    value={selectedEvent.value}
                                    onChange={(e) => {
                                        const id = e.target.value
                                        const event = eventList.find((s) => String(s.value) === id)
                                        setSelectedEvent(id, event?.label ?? '')
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