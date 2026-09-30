"use client"

import { create } from "zustand";
import { ProfileEntity, ProfileInterface } from "../entity/ProfileEntity"
import { _profileViewAction } from "../actions/ProfileActions";



interface PropInterface {
    data: ProfileInterface,
    preData: ProfileInterface,
    errors: ProfileInterface,
    message: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    togglePasswordModal: boolean
    resetPassword: () => void
    setTogglePasswordModal: (i: boolean) => void
    setToggleModal: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
    setError: (name: string, value: string) => void,
    setData: (data: ProfileInterface) => void,
    resetData: () => void,
    setIsSubmitting: (i: boolean) => void,
    setMessage: (str: string) => void,
    clearErrors: () => void
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: ProfileInterface },
    validatePasswordForm: () => { isValid: boolean; errors: ProfileInterface },
    getData: () => Promise<void>
}


export const useProfileStore = create<PropInterface>((set, get) => ({
    data: ProfileEntity,
    preData: ProfileEntity,
    errors: ProfileEntity,
    message: "",
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    togglePasswordModal: false,
    resetPassword: () => {
        const current = get().data
        set({
            data: { ...current, password: "" }
        })
    },
    setTogglePasswordModal: (i) => {
        set({
            togglePasswordModal: i
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
            data: i ?? ProfileEntity,
            preData: i ?? ProfileEntity,
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
            data: ProfileEntity,
            preData: ProfileEntity,
        })
    },
    setMessage: (i) => {
        set({
            message: i
        })
    },
    clearErrors: () => {
        set({
            errors: ProfileEntity,
        })
    },
    validateField: (name, value) => {
        const { data } = get();
        let error = "";
        // Safety guard: if value is null or undefined, treat it as empty string
        const safeValue = value || "";

        switch (name) {
            case "name":
                if (!safeValue.trim()) error = "Name is required.";
                break;
            case "email":
                if (!safeValue.trim()) error = "Email is required.";
                break;
            case "phone":
                if (!safeValue.trim()) error = "Phone Number is required.";
                break;
            // ADD THIS CASE
            case "password":
                if (!safeValue.trim()) {
                    error = "Password is required.";
                } else if (safeValue.length < 6) { // Optional: add length check
                    error = "Password must be at least 6 characters.";
                }
                break;
            case "passwordConfirm":
                if (!safeValue.trim()) {
                    error = "Confirm Password is required.";
                } else if (safeValue !== data.password) {
                    error = "Passwords do not match.";
                }
                break;
            default:
                break;
        }
        return error;
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...ProfileEntity };
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
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    validatePasswordForm: () => {
        const { data } = get();
        let errors = { ...ProfileEntity };
        let hasError = false;
        // Validate PASSWORD
        const passwordError = get().validateField("password", data.password);
        if (passwordError) {
            errors.password = passwordError;
            hasError = true;
        }
        // Validate PASSWORD CONFIRM
        const passwordConfirmError = get().validateField("passwordConfirm", data.passwordConfirm);
        if (passwordConfirmError) {
            errors.passwordConfirm = passwordConfirmError;
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
            const res = await _profileViewAction();
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: ProfileEntity,
                    preData: ProfileEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: ProfileEntity,
                preData: ProfileEntity,
                isLoading: false,
            });
        }
    }


}))