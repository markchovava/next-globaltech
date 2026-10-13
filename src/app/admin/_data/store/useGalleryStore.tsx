"use client"

import { create } from "zustand";
import { GalleryEntity, GalleryInterface } from "../entity/GalleryEntity";
import { ResponseInterface, MetaLinksEntity, MetaEntity, MetaLinksInterface, MetaInterface } from "../entity/ResponseEntity";
import { _galleryListAction, _galleryPaginateAction, _gallerySearchAction, _galleryViewAction } from "../actions/GalleryActions";


interface Props {
    data: GalleryInterface,
    preData: GalleryInterface,
    isLoading: boolean,
    search: string,
    meta: MetaInterface,
    links: MetaLinksInterface,
    dataList: GalleryInterface[],
    errors: GalleryInterface,
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
    setData: (data: GalleryInterface) => void
    resetData: () => void
    setIsSubmitting: (i: boolean) => void
    clearErrors: () => void
    getData: (i: number | string) => Promise<void>
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useEventStore = create<Props>((set, get) => ({
    data: GalleryEntity,
    preData: GalleryEntity,
    isLoading: true,
    search: '',
    meta: MetaEntity,
    links: MetaLinksEntity,
    dataList: [],
    errors: GalleryEntity,
    toggleModal: false,
    isSearching: false,
    isSubmitting: false,
    setIsLoading: (i) => {
        set({
            isLoading: i
        })
    },
    setToggleModal: (i) => {
        set({
            toggleModal: i
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
            data: i ?? GalleryEntity,
            preData: i ?? GalleryEntity,
            isLoading: false,
        });
    },
    resetData: () => {
        set({
            data: GalleryEntity,
            preData: GalleryEntity,
        });
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    clearErrors: () => {
        set({ errors: GalleryEntity });
    },
    getData: async (i) => {
        try {
            const res = await _galleryViewAction(i);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: GalleryEntity,
                    preData: GalleryEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: GalleryEntity,
                preData: GalleryEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _galleryListAction();
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
            const res = await _gallerySearchAction(search);
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
            const res = await _galleryPaginateAction(url);
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