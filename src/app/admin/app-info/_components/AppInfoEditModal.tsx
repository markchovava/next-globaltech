"use client"

import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useAppInfoStore } from '../../_data/store/useAppInfoStore';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import TextAreaInputDefault from '../../_components/forms/textareas/TextAreaInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import ImageInputDefault from '../../_components/forms/image/ImageInputDefault';
import { _appInfoStoreAction } from '../../_data/actions/AppInfoActions';
import { baseURL } from '@/_api/baseURL';



const title = "Edit App Information"


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


export default function AppInfoEditModal() {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        setImage,
        getData,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useAppInfoStore()

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
                validation.errors.email ||
                validation.errors.website ||
                validation.errors.address;
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('name', data.name ?? '');
        formData.append('phone', data.phone ?? '');
        formData.append('email', data.email ?? '');
        formData.append('website', data.website ?? '');
        formData.append('address', data.address ?? '');
        formData.append('description', data.description ?? '');
        formData.append('whatsapp', data.whatsapp ?? '');
        formData.append('facebook', data.facebook ?? '');
        formData.append('instagram', data.instagram ?? '');
        formData.append('tiktok', data.tiktok ?? '');
        formData.append('linkedin', data.linkedin ?? '');
        formData.append('twitter', data.twitter ?? '');
        if (data.imageUpload) {
            formData.append('image', data.imageUpload)
        }
        try {
            const res = await _appInfoStoreAction(formData);
            //console.log('res _appInfoStoreAction', res)
            const { status, message, data } = res
            switch (status) {
                case 1:
                    toast.success(message);
                    clearErrors();
                    setIsSubmitting(false);
                    await getData();
                    setToggleModal(false)
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
                                {/*  <div className='w-[30%]'>
                                    <ImageInputDefault
                                        label='Image'
                                        name='name'
                                        value={baseURL + data.image}
                                        onChange={(e) => setImage(e)}
                                        error={errors.image}
                                    />

                                </div>
                                <SpacerPrimary /> */}

                                <TextInputDefault
                                    label='Name'
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    placeholder='Enter your Name.'
                                    onChange={setInputValue}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Email'
                                    name='email'
                                    type="email"
                                    value={data.email}
                                    placeholder='Enter your Email.'
                                    onChange={setInputValue}
                                    error={errors.email}
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
                                    type="text"
                                    label='Website'
                                    name='website'
                                    value={data.website}
                                    placeholder='Enter your Website.'
                                    onChange={setInputValue}
                                    error={errors.website}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    type="text"
                                    label='Address'
                                    name='address'
                                    value={data.address}
                                    placeholder='Enter Address here.'
                                    onChange={setInputValue}
                                    error={errors.address}
                                />
                                <SpacerPrimary />

                                <TextAreaInputDefault
                                    label='Description'
                                    name='description'
                                    value={data.description}
                                    placeholder='Enter Description here.'
                                    onChange={setInputValue}
                                    error={errors.description}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Facebook'
                                    name='facebook'
                                    type="text"
                                    value={data.facebook}
                                    placeholder='Enter Facebook Link here.'
                                    onChange={setInputValue}
                                />
                                <SpacerPrimary />

                                {/* Add other social media inputs */}
                                <TextInputDefault
                                    label='Instagram'
                                    name='instagram'
                                    type="text"
                                    value={data.instagram}
                                    placeholder='Enter Instagram Link...'
                                    onChange={setInputValue}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='WhatsApp'
                                    name='whatsapp'
                                    type="text"
                                    value={data.whatsapp}
                                    placeholder='Enter WhatsApp Number...'
                                    onChange={setInputValue}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='TikTok'
                                    name='tiktok'
                                    type="text"
                                    value={data.tiktok}
                                    placeholder='Enter TikTok Link...'
                                    onChange={setInputValue}

                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='LinkedIn'
                                    name='linkedin'
                                    type="text"
                                    value={data.linkedin}
                                    placeholder='Enter LinkedIn Link...'
                                    onChange={setInputValue}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Twitter'
                                    name='twitter'
                                    type="text"
                                    value={data.twitter}
                                    placeholder='Enter Twitter Link...'
                                    onChange={setInputValue}
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