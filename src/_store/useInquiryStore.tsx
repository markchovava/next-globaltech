"use client"

import { create } from "zustand"
import { OfferEntity, OfferInterface } from "@/_data/entity/OfferEntity"
import { ServiceEntity, ServiceInterface } from "@/_data/entity/ServiceEntity"
import { InquiryEntity, InquiryInterface } from "@/app/admin/_data/entity/InquiryEntity"



interface Props {
    toggleModal: boolean
    isLoading: boolean
    isSubmitting: boolean
    service: ServiceInterface
    offer: OfferInterface
    data: InquiryInterface
    errors: InquiryInterface
    resetService: (i: ServiceInterface) => void
    setService: (i: ServiceInterface) => void
    setOffer: (i: OfferInterface) => void
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
    setError: (name: string, value: string) => void
    setIsLoading: (i: boolean) => void
    setData: (i: InquiryInterface) => void
    setToggleModal: (i: boolean) => void
    setIsSubmitting: (i: boolean) => void
    clearErrors: () => void
    resetData: () => void
    validateField: (name: string, value: string) => string
    validateForm: () => { isValid: boolean; errors: InquiryInterface }
}

export const useInquiryStore = create<Props>((set, get) => ({
    toggleModal: false,
    service: ServiceEntity,
    isLoading: false,
    isSubmitting: false,
    offer: OfferEntity,
    data: InquiryEntity,
    errors: InquiryEntity,
    resetService: (i) => {
        set({
            service: ServiceEntity
        })
    },
    setService: (i) => {
        set({
            service: i
        })
    },
    setOffer: (i) => {
        set({
            offer: i
        })
    },
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        })
    },
    setIsLoading: (i) => {
        set({
            isLoading: i
        })
    },
    setData: (i) => {
        set({
            data: i
        })
    },
    setToggleModal: (i) => {
        set({
            toggleModal: i
        })
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    clearErrors: () => {
        set({
            errors: InquiryEntity
        })
    },
    resetData: () => {
        set({
            data: InquiryEntity
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch (name) {
            case "customerName":
                if (!value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "customerEmail":
                if (!value.trim()) {
                    error = "Email is required.";
                }
                break;
            case "customerPhone":
                if (!value.trim()) {
                    error = "Phone Number is required.";
                }
                break;
            case "customerAddress":
                if (!value.trim()) {
                    error = "Address is required.";
                }
                break;
            case "message":
                if (!value.trim()) {
                    error = "Message is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...InquiryEntity };
        let hasError = false;

        // Validate NAME
        const customerNameError = get().validateField("customerName", data.customerName);
        if (customerNameError) {
            errors.customerName = customerNameError;
            hasError = true;
        }
        // Validate PHONE
        const customerPhoneError = get().validateField("customerPhone", data.customerPhone);
        if (customerPhoneError) {
            errors.customerPhone = customerPhoneError;
            hasError = true;
        }
        // Validate EMAIL
        const customerEmailError = get().validateField("email", data.customerEmail);
        if (customerEmailError) {
            errors.customerEmail = customerEmailError;
            hasError = true;
        }
        // Validate ADDRESS
        const customerAddressError = get().validateField("customerAddress", data.customerAddress);
        if (customerAddressError) {
            errors.customerAddress = customerAddressError;
            hasError = true;
        }
        // Validate MESSAGE
        const messageError = get().validateField("message", data.message);
        if (messageError) {
            errors.message = messageError;
            hasError = true;
        }

        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
}))