"use client"

import { create } from "zustand";
import {
    MetaEntity,
    MetaInterface,
    MetaLinksEntity,
    MetaLinksInterface,
    ResponseInterface
} from "../entity/ResponseEntity";
import {
    _newsListAction,
    _newsPaginateAction,
    _newsSearchAction,
    _newsViewAction
} from "../actions/NewsActions";
import {
    NewsInterface,
    NewsEntity
} from "../entity/NewsEntity";


interface PropInterface {
    dataList: NewsInterface[]
    meta: MetaInterface
    links: MetaLinksInterface
    data: NewsInterface,
    preData: NewsInterface,
    errors: Record<string, string>, // Changed to Record to safely handle string error messages
    message: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    search: string,
    isSearching: boolean,
    setIsLoading: (i: boolean) => void
    setDataList: (i: ResponseInterface) => void
    setImage: (e: File) => void
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSearching: (i: boolean) => void,
    setToggleModal: (i: boolean) => void,
    setValue: (field: string, value: any) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement> |
        { target: { name: string; value: string } }
    ) => void
    setError: (title: string, value: string) => void,
    setData: (data: NewsInterface) => void,
    resetData: () => void,
    setIsSubmitting: (i: boolean) => void,
    setMessage: (str: string) => void,
    clearErrors: () => void
    validateField: (title: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: Record<string, string> },
    getData: (i: number | string) => Promise<void>,
    getDataList: () => Promise<void>,
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useNewsStore = create<PropInterface>((set, get) => ({
    dataList: [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: NewsEntity,
    preData: NewsEntity,
    errors: {},
    message: "",
    search: "",
    isSearching: false,
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    setValue: (field, value) => {
        const currentData = get().data;
        set({
            data: {
                ...currentData,
                [field]: value
            }
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
    setImage: (i) => {
        const current = get().data
        set({
            data: { ...current, imageUpload: i }
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
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    setInputValue: (e) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = target.name;
        const value = target.value;

        const currentData = get().data;
        const currentErrors = get().errors;

        set({
            data: {
                ...currentData,
                [name]: value
            },
            errors: currentErrors[name]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    setData: (i) => {
        set({
            data: i ? i : NewsEntity,
            preData: i ? i : NewsEntity,
            isLoading: false,
        })
    },
    setError: (title, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [title]: value }
        })
    },
    resetData: () => {
        set({
            data: NewsEntity,
            preData: NewsEntity,
        })
    },
    setMessage: (i) => {
        set({
            message: i
        })
    },
    clearErrors: () => {
        set({
            errors: {},
        })
    },
    validateField: (title, value) => {
        let error = ""
        switch (title) {
            case "title":
                if (!value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "status":
                if (!value.trim()) {
                    error = "Status is required.";
                }
                break;
            case "content":
                if (!value.trim()) {
                    error = "Content is required.";
                }
                break;
            case "priority":
                if (!value) {
                    error = "Priority is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => {
        const { data } = get();
        let errors: Record<string, string> = {};
        let hasError = false;

        const titleError = get().validateField("title", data.title);
        if (titleError) {
            errors.title = titleError;
            hasError = true;
        }
        const statusError = get().validateField("status", data.status);
        if (statusError) {
            errors.status = statusError;
            hasError = true;
        }
        const contentError = get().validateField("content", data.content);
        if (contentError) {
            errors.content = contentError;
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
            const res = await _newsViewAction(i);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: NewsEntity,
                    preData: NewsEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: NewsEntity,
                preData: NewsEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _newsListAction();
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
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
            const res = await _newsSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
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
            const res = await _newsPaginateAction(url);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
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