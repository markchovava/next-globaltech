"use client"

import { create } from "zustand"
import { OfferEntity, OfferInterface } from "@/_data/entity/OfferEntity"
import { QuoteEntity, QuoteInterface } from "@/_data/entity/QuoteEntity"
import { ServiceEntity, ServiceInterface } from "@/_data/entity/ServiceEntity"



interface Props {
    toggleModal: boolean
    isLoading: boolean
    isSubmitting: boolean
    service: ServiceInterface
    offer: OfferInterface
    data: QuoteInterface
    errors: QuoteInterface
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
    setData: (i: QuoteInterface) => void
    setToggleModal: (i: boolean) => void
    setIsSubmitting: (i: boolean) => void
    clearErrors: () => void
    resetData: () => void
    validateField: (name: string, value: string) => string
    validateForm: () => { isValid: boolean; errors: QuoteInterface }
}

export const useQuoteStore = create<Props>((set, get) => ({
    toggleModal: false,
    service: ServiceEntity,
    isLoading: false,
    isSubmitting: false,
    offer: OfferEntity,
    data: QuoteEntity,
    errors: QuoteEntity,
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
            errors: QuoteEntity
        })
    },
    resetData: () => {
        set({
            data: QuoteEntity
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "email":
                if (!value.trim()) {
                    error = "Email is required.";
                }
                break;
            case "phone":
                if (!value.trim()) {
                    error = "Phone Number is required.";
                }
                break;
            case "address":
                if (!value.trim()) {
                    error = "Address is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...QuoteEntity };
        let hasError = false;

        // Validate NAME
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate EMAIL
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate ADDRESS
        const addressError = get().validateField("address", data.address);
        if (addressError) {
            errors.address = addressError;
            hasError = true;
        }

        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
}))