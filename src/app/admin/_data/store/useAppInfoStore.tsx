"use client"

import { create } from "zustand";
import { AppInfoEntity, AppInfoInterface } from "../entity/AppInfoEntity"
import { _appInfoViewAction } from "../actions/AppInfoActions";



interface PropInterface {
    data: AppInfoInterface,
    preData: AppInfoInterface,
    errors: AppInfoInterface,
    message: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    setImage: (e: File) => void
    setToggleModal: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
    setError: (name: string, value: string) => void,
    setData: (data: AppInfoInterface) => void,
    resetData: () => void,
    setIsSubmitting: (i: boolean) => void,
    setMessage: (str: string) => void,
    clearErrors: () => void
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: AppInfoInterface },
    getData: () => Promise<void>
}


export const useAppInfoStore = create<PropInterface>((set, get) => ({
    data: AppInfoEntity,
    preData: AppInfoEntity,
    errors: AppInfoEntity,
    message: "",
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    setImage: (i) => {
        const current = get().data
        set({
            data: { ...current, imageUpload: i }
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
    setData: (i) => {
        set({
            data: i ?? AppInfoEntity,
            preData: i ?? AppInfoEntity,
            isLoading: false,
        })
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        })
    },
    resetData: () => {
        set({
            data: AppInfoEntity,
            preData: AppInfoEntity,
        })
    },
    setMessage: (i) => {
        set({
            message: i
        })
    },
    clearErrors: () => {
        set({
            errors: AppInfoEntity,
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
            case "website":
                if (!value.trim()) {
                    error = "Website is required.";
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
        let errors = { ...AppInfoEntity };
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
        // Validate WEBSITE
        const websiteError = get().validateField("website", data.website);
        if (websiteError) {
            errors.website = websiteError;
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
    getData: async () => {
        try {
            const res = await _appInfoViewAction();
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: AppInfoEntity,
                    preData: AppInfoEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: AppInfoEntity,
                preData: AppInfoEntity,
                isLoading: false,
            });
        }
    }


}))