"use client"

import { useContactStore } from "@/_store/useContactStore"
import Heading2 from "../headings/Heading2"
import TextInput from "./inputs/TextInput"
import TextArea from "./textareas/TextArea"
import Button from "../buttons/Button"
import { toast } from "react-toastify"
import { _messageStoreAction, messageStoreAction } from "@/app/admin/_data/actions/MessageActions"
import { useAdmissionStore } from "@/_store/useAdmissionStore"
import SelectInput from "./selects/SelectInput"
import { LevelsData } from "@/_data/sample/LevelsData"
import SelectInput2 from "./selects/SelectInput2"


export default function AdmissionForm() {
    const {
        data,
        errors,
        isSubmitting,
        setInputValue,
        clearErrors,
        validateForm,
        setIsSubmitting,
        resetData
    } = useAdmissionStore()

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();
        //console.log('data', data)

        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name ||
                validation.errors.phone ||
                validation.errors.email ||
                validation.errors.levelId ||
                validation.errors.address ||
                validation.errors.parentName ||
                validation.errors.parentPhone ||
                validation.errors.parentEmail
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            email: data.email,
            message: data.phone,
        }

        try {
            /* const res = await messageStoreAction(formData);
            console.log('res', res)
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
            } */
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
                    name="phone"
                    value={data.phone}
                    label='Phone Number'
                    type='text'
                    placeholder='Enter Phone Number here.'
                    onChange={setInputValue}
                    error={errors.phone}
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
                <TextInput
                    name="address"
                    value={data.address}
                    label='Address'
                    type='text'
                    placeholder='Enter Address here.'
                    onChange={setInputValue}
                    error={errors.address}
                />
                <SelectInput2
                    name="address"
                    value={data.address}
                    label='Address'
                    data={LevelsData}
                    onChange={setInputValue}
                    error={errors.address}
                />
                <TextInput
                    name="parentName"
                    value={data.parentName}
                    label='Parent Name'
                    type='text'
                    placeholder='Enter Parent Name here.'
                    onChange={setInputValue}
                    error={errors.parentName}
                />
                <TextInput
                    name="parentPhone"
                    value={data.parentPhone}
                    label='Parent Phone'
                    type='text'
                    placeholder='Enter Parent Phone here.'
                    onChange={setInputValue}
                    error={errors.parentEmail}
                />
                <TextInput
                    name="parentEmail"
                    value={data.parentEmail}
                    label='Parent Email'
                    type='text'
                    placeholder='Enter Parent Email here.'
                    onChange={setInputValue}
                    error={errors.parentEmail}
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