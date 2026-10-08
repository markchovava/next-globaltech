"use client"

import { create } from "zustand";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "../entity/ResponseEntity";
import { InquiryEntity, InquiryInterface } from "../entity/InquiryEntity";
import { _inquiryListAction, _inquiryPaginateAction, _inquirySearchAction, _inquiryViewAction } from "../actions/InquiryActions";
import { ServiceInterface } from "../entity/ServiceEntity";



interface ServiceItem {
    label: string | number;
    value: string | number;
}

interface SelectedServiceInterface {
    id: string | number
    name: string | number
}

const SelectedServiceEntity: SelectedServiceInterface = { id: '', name: '' }

interface PropsInterface {
    data: InquiryInterface,
    selectedService: SelectedServiceInterface
    servicesList: ServiceItem[]
    dataList: InquiryInterface[],
    meta: MetaInterface,
    links: MetaLinksInterface,
    preData: InquiryInterface,
    errors: InquiryInterface,
    search: string,
    isSearching: boolean,
    inquiry: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    setSelectedService: (id: string | number, name: string | number) => void
    setServicesList: (i: ServiceInterface[]) => void
    setDataListAll: (i: InquiryInterface[]) => void,
    setIsLoading: (i: boolean) => void,
    setDataList: (i: ResponseInterface) => void
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSearching: (i: boolean) => void,
    setToggleModal: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setError: (name: string, value: string) => void,
    setValue: (name: string, value: string | number) => void,
    setData: (i: InquiryInterface) => void,
    resetData: () => void,
    setIsSubmitting: (i: boolean) => void,
    setInquiry: (i: string) => void,
    clearErrors: () => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: InquiryInterface },
    getData: (i: number | string) => Promise<void>,
    getDataList: () => Promise<void>,
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useInquiryStore = create<PropsInterface>((set, get) => ({
    data: InquiryEntity,
    servicesList: [],
    selectedService: SelectedServiceEntity,
    dataList: [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    preData: InquiryEntity,
    errors: InquiryEntity,
    search: '',
    isSearching: false,
    inquiry: '',
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    setSelectedService: (id, name) => {
        set({
            selectedService: { id, name },
            // keep the form data in sync so it's submitted
            data: { ...get().data, serviceId: id, serviceName: String(name) },
        })
    },
    setServicesList: (i) => {
        const list = i.map((s) => ({ value: s.id, label: s.name }))
        set({ servicesList: list })
    },
    setDataListAll: (i) => {
        set({
            dataList: i,
            isLoading: false,
        })
    },
    setValue: (name, value) => {
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: { ...currentData, [name]: value },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        })
    },
    setIsLoading: (i) => {
        set({
            isLoading: i
        })
    },
    setDataList: (i) => {
        const { data, links, meta } = i
        set({
            dataList: data,
            meta: meta,
            links: links,
            isLoading: false,
        })
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
        })
    },
    setIsSearching: (i) => {
        set({
            isSearching: i
        })
    },
    setToggleModal: (i) => {
        set({
            toggleModal: i
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
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        })
    },
    setData: (i) => {
        //console.log('SetData', i)
        set({
            data: i,
            preData: i,
            isLoading: false,
        })
    },
    resetData: () => {
        set({
            data: InquiryEntity,
            selectedService: SelectedServiceEntity,
        })
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i,
        })
    },
    setInquiry: (i) => {
        set({
            inquiry: i
        })
    },
    clearErrors: () => {
        set({
            errors: InquiryEntity
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch (name) {
            case "customerName":
                if (!value.trim()) {
                    error = "Customer Name is required.";
                }
                break;
            case "customerPhone":
                if (!value.trim()) {
                    error = "Customer Phone Number is required.";
                }
                break;
            case "customerEmail":
                if (!value.trim()) {
                    error = "Customer Email is required.";
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
        // Validate CUSTOMER NAME
        const customerNameError = get().validateField("customerName", data.customerName);
        if (customerNameError) {
            errors.customerName = customerNameError;
            hasError = true;
        }
        // Validate CUSTOMER PHONE
        const customerPhoneError = get().validateField("customerPhone", data.customerPhone);
        if (customerPhoneError) {
            errors.customerPhone = customerPhoneError;
            hasError = true;
        }
        // Validate CUSTOMER EMAIL
        const customerEmailError = get().validateField("customerEmail", data.customerEmail);
        if (customerEmailError) {
            errors.customerEmail = customerEmailError;
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
    getData: async (i) => {
        try {
            const res = await _inquiryViewAction(i);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: InquiryEntity,
                    preData: InquiryEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: InquiryEntity,
                preData: InquiryEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _inquiryListAction();
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
    getSearchDatalist: async (search) => {
        set({ isSearching: true });
        try {
            const res = await _inquirySearchAction(search);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isSearching: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isSearching: false,
            });
        }
    },
    getPaginatedDatalist: async (url: string) => {
        set({ isLoading: true });
        try {
            const res = await _inquiryPaginateAction(url);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
}))