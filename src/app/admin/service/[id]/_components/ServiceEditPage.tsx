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
import ImageInputDefault from '@/app/admin/_components/forms/image/ImageInputDefault';
import TextArea from '@/_components/forms/textareas/TextArea';
import { _serviceUpdateAction } from '../../../_data/actions/ServiceActions';
import { useServiceStore } from '@/app/admin/_data/store/useServiceStore';
import { StatusPubData } from '@/_data/sample/StatusData';
import { listNumbers } from '@/_utils/formatNumber';
import RichTextEditor from '@/app/admin/_components/forms/editors/RichTextEditor';




const title = "Edit Service"


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


export default function ServiceEditModal({ id }: PropInterface) {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        getData,
        setImage,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useServiceStore()

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
                validation.errors.status ||
                validation.errors.description;
            toast.warn(firstError);
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('name', data.name ?? '')
        formData.append('priority', data.priority.toString() ?? '')
        formData.append('status', data.status ?? '')
        formData.append('description', data.description ?? '')
        if (data.imageUpload) {
            formData.append('image', data.imageUpload)
        }

        try {
            const res = await _serviceUpdateAction(id, formData);
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

                                <div className='lg:w-[30%] w-[60%]'>
                                    <ImageInputDefault
                                        label='Image'
                                        name='image'
                                        value={data.image}
                                        onChange={(e) => setImage(e)}
                                        error={errors.image}
                                    />
                                </div>
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

                                <RichTextEditor
                                    label="Description"
                                    name="description"
                                    value={data.description}
                                    placeholder="Enter your Description..."
                                    onChange={setInputValue}
                                    error={errors.description}
                                />

                                <SelectAdminDefault
                                    label='Status'
                                    name='status'
                                    data={StatusPubData}
                                    value={data.status}
                                    onChange={setInputValue}
                                    error={errors.status}
                                />
                                <SpacerPrimary />

                                <SelectAdminDefault
                                    label='Priority'
                                    name='priority'
                                    data={listNumbers(7)}
                                    value={data.priority}
                                    onChange={setInputValue}
                                    error={errors.priority.toString()}
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