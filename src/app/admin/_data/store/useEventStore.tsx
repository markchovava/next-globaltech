"use client"

import { create } from "zustand";
import { EventEntity, EventInterface } from "../entity/EventEntity";
import { ResponseInterface, MetaLinksEntity, MetaEntity, MetaLinksInterface, MetaInterface } from "../entity/ResponseEntity";
import { _eventListAction, _eventPaginateAction, _eventSearchAction, _eventViewAction } from "../actions/EventActions";


interface Props {
    data: EventInterface,
    preData: EventInterface,
    isLoading: boolean,
    search: string,
    meta: MetaInterface,
    links: MetaLinksInterface,
    dataList: EventInterface[],
    errors: EventInterface,
    toggleModal: boolean,
    isSearching: boolean,
    isSubmitting: boolean,
    setIsLoading: (i: boolean) => void,
    setToggleModal: (i: boolean) => void,
    setDataList: (i: ResponseInterface) => void
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    setIsSearching: (i: boolean) => void
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement> |
        { target: { name: string; value: string } }
    ) => void
    setError: (name: string, value: string) => void
    setData: (data: EventInterface) => void
    resetData: () => void
    setIsSubmitting: (i: boolean) => void
    clearErrors: () => void
    validateField: (name: string, value: string) => string
    validateForm: () => { isValid: boolean; errors: EventInterface }
    getData: (i: number | string) => Promise<void>
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useEventStore = create<Props>((set, get) => ({
    data: EventEntity,
    preData: EventEntity,
    isLoading: true,
    meta: MetaEntity,
    links: MetaLinksEntity,
    dataList: [],
    event: '',
    search: '',
    isSearching: false,
    errors: EventEntity,
    toggleModal: false,
    isSubmitting: false,
    setIsLoading: (i) => {
        set({ isLoading: i })
    },
    setToggleModal: (i) => {
        set({ toggleModal: i })
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
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            errors: {
                ...currentErrors,
                [name]: ""
            }
        });
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        });
    },
    setData: (i) => {
        set({
            data: i ? i : EventEntity,
            preData: i ? i : EventEntity,
            isLoading: false,
        });
    },
    resetData: () => {
        set({
            data: EventEntity,
            preData: EventEntity,
        });
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    clearErrors: () => {
        set({ errors: EventEntity });
    },
    validateField: (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value || !value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "date":
                if (!value || !value.trim()) {
                    error = "Date is required.";
                }
                break;
            case "venue":
                if (!value || !value.trim()) {
                    error = "Venue is required.";
                }
                break;
            case "status":
                if (!value || !value.trim()) {
                    error = "Status is required.";
                }
                break;
            default:
                break;
        }
        return error;
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...EventEntity };
        let hasError = false;
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        const dateError = get().validateField("date", data.date);
        if (dateError) {
            errors.date = dateError;
            hasError = true;
        }
        const venueError = get().validateField("venue", data.venue);
        if (venueError) {
            errors.venue = venueError;
            hasError = true;
        }
        const statusError = get().validateField("status", data.status);
        if (statusError) {
            errors.status = statusError;
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
            const res = await _eventViewAction(i);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: EventEntity,
                    preData: EventEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: EventEntity,
                preData: EventEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _eventListAction();
            // Check if response has the expected structure
            if (res && res?.data && res?.meta && res.links) {
                set({
                    dataList: res?.data,
                    meta: res?.meta,
                    links: res?.links,
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
            const res = await _eventSearchAction(search);
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
            const res = await _eventPaginateAction(url);
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
