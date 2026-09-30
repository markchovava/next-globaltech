"use client"

import { useContactStore } from "@/_store/useContactStore"
import Heading2 from "../headings/Heading2"
import TextInput from "./inputs/TextInput"
import TextArea from "./textareas/TextArea"
import Button from "../buttons/Button"
import { toast } from "react-toastify"
import { _messageStoreAction, messageStoreAction } from "@/app/admin/_data/actions/MessageActions"


export default function ContactForm() {
    const {
        data,
        errors,
        isSubmitting,
        setInputValue,
        clearErrors,
        validateForm,
        setIsSubmitting,
        resetData
    } = useContactStore()

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();
        console.log('data', data)

        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name ||
                validation.errors.email ||
                validation.errors.message
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            email: data.email,
            title: 'NEW MESSAGE FROM SITE',
            message: data.message,
        }

        try {
            const res = await messageStoreAction(formData);
            console.log('res', res)

            // FIX: Renamed 'data' to 'resData' to avoid conflict with the store's 'data' variable
            const { status, message, data: resData } = res

            switch (status) {
                case 1:
                    toast.success(message);
                    clearErrors();
                    resetData()
                    setIsSubmitting(false);
                    return
                default:
                    // FIX: Changed toast.success to toast.error for the fallback failure state
                    toast.error('Something went wrong, please try again.');
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
        <div>
            <Heading2 name="Talk to us" />
            <form onSubmit={handleSubmit} className="border-t border-gray-200 my-4 py-4 space-y-4">
                <TextInput
                    name="name"
                    value={data.name}
                    label='Name'
                    type='text'
                    placeholder='Enter Name here.'
                    onChange={setInputValue}
                    error={errors.name}
                />
                <TextInput
                    name="email"
                    value={data.email}
                    label='Email'
                    type='text'
                    placeholder='Enter Email here.'
                    onChange={setInputValue}
                    error={errors.email}
                />
                <TextArea
                    name="message"
                    value={data.message}
                    label='Message'
                    placeholder='Enter Message here.'
                    onChange={setInputValue}
                    error={errors.message}
                />
                <Button
                    type="submit"
                    name="Submit"
                    status={isSubmitting}
                    css='text-lg py-3 px-9 text-white'
                />
            </form>
        </div>
    )
}