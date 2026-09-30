"use client"

import { create } from "zustand"
import { AdmissionEntity, AdmissionInterface } from "../_data/entity/AdmissionEntity"

interface Props {
    data: AdmissionInterface
    isSubmitting: boolean
    errors: AdmissionInterface
    resetData: () => void
    setData: (i: AdmissionInterface) => void
    setIsSubmitting: (i: boolean) => void
    setError: (name: string, value: string) => void
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
    clearErrors: () => void
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: AdmissionInterface },
}


export const useAdmissionStore = create<Props>((set, get) => ({
    data: AdmissionEntity,
    isSubmitting: false,
    errors: AdmissionEntity,
    setData: (i) => {
        set({
            data: i
        })
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    setError: (name, value) => {
        const i = get().data
        set({
            data: { ...i, [name]: value }
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
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    resetData: () => {
        set({
            data: AdmissionEntity
        })
    },
    clearErrors: () => {
        set({
            errors: AdmissionEntity,
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
            case "parentName":
                if (!value.trim()) {
                    error = "Parent Name is required.";
                }
                break;
            case "parentEmail":
                if (!value.trim()) {
                    error = "Parent Email is required.";
                }
                break;
            case "parentPhone":
                if (!value.trim()) {
                    error = "Parent Phone is required.";
                }
                break;
            case "levelId":
                if (!value.trim()) {
                    error = "Level is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...AdmissionEntity };
        let hasError = false;

        // Validate NAME
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
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
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate PARENT NAME
        const parentNameError = get().validateField("parentName", data.parentName);
        if (parentNameError) {
            errors.parentName = parentNameError;
            hasError = true;
        }
        // Validate PARENT EMAIL
        const parentEmailError = get().validateField("parentEmail", data.parentEmail);
        if (parentEmailError) {
            errors.parentEmail = parentEmailError;
            hasError = true;
        }
        // Validate PARENT PHONE
        const parentPhoneError = get().validateField("parentPhone", data.parentPhone);
        if (parentPhoneError) {
            errors.parentPhone = parentPhoneError;
            hasError = true;
        }
        // Validate LEVEL
        const levelIdError = get().validateField("levelId", data.levelId.toString());
        if (levelIdError) {
            errors.levelId = levelIdError;
            hasError = true;
        }

        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
}))