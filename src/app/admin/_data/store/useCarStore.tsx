"use client"

import { create } from "zustand";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "../entity/ResponseEntity";
import { _carListAction, _carPaginateAction, _carSearchAction, _carViewAction } from "../actions/CarActions";
import { CarEntity, CarImageEntity, CarImageInterface, CarImageListEntity, CarInterface, CarPropertyEntity, CarPropertyInterface } from "../entity/CarEntity";



interface PropInterface {
    dataList: CarInterface[]
    properties: CarPropertyInterface[]
    currentProperty: CarPropertyInterface
    imagesList: CarImageInterface[]
    meta: MetaInterface
    links: MetaLinksInterface
    data: CarInterface
    preData: CarInterface
    errors: CarInterface
    message: string
    isLoading: boolean
    isSubmitting: boolean
    toggleModal: boolean
    search: string
    isSearching: boolean
    imagesDeleted: any[]
    addImageDeleted: (i: number | string) => void
    setDbImages: (i: CarImageInterface[]) => void
    setDbProperties: (i: CarPropertyInterface[]) => void
    addCurrentProperty: (name: string, value: string) => void
    setProperty: (i: CarPropertyInterface) => void
    removeProperty: (id: string | number) => void
    setImagesList: (i: CarImageInterface[]) => void
    setIsLoading: (i: boolean) => void
    setDataList: (i: ResponseInterface) => void
    setImage: (e: React.ChangeEvent<HTMLInputElement> | File, id: number | string) => void
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    setIsSearching: (i: boolean) => void
    setToggleModal: (i: boolean) => void
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
    setError: (name: string, value: string) => void
    setData: (data: CarInterface) => void
    resetData: () => void
    setIsSubmitting: (i: boolean) => void
    setMessage: (str: string) => void
    clearErrors: () => void
    validateField: (name: string, value: string) => string
    validateForm: () => { isValid: boolean; errors: CarInterface }
    getData: (i: number | string) => Promise<void>
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useCarStore = create<PropInterface>((set, get) => ({
    dataList: [],
    properties: [],
    currentProperty: CarPropertyEntity,
    imagesList: CarImageListEntity || [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: CarEntity,
    preData: CarEntity,
    errors: CarEntity,
    message: "",
    search: "",
    isSearching: false,
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    imagesDeleted: [],
    addImageDeleted: (i) => {
        if (!i) return;
        const list = get().imagesDeleted;
        if (!list.includes(i)) {
            set({ imagesDeleted: [...list, i] });
        }
    },
    setDbImages: (images) => {
        if (!images || images.length === 0) {
            set({ imagesList: CarImageListEntity || [] });
            return;
        }
        const list = images.map((img, index) => ({
            ...img,
            uid: index + 1
        }));

        // Pad to 4 slots with empty CarImageEntity entries so ImagesSection always has 4 defined slots
        const padded = [...list];
        while (padded.length < 4) {
            padded.push({ ...CarImageEntity, uid: padded.length + 1 });
        }

        set({ imagesList: padded });
    },
    setDbProperties: (i) => {
        set({ properties: i || [] });
    },
    removeProperty: (id) => {
        set((state) => ({
            properties: state.properties.filter((item) => String(item.id) !== String(id))
        }));
    },
    addCurrentProperty: (name, value) => {
        const i = get().currentProperty;
        set({
            currentProperty: { ...i, [name]: value }
        });
    },
    setProperty: (i) => {
        if (i.name && i.value) {
            const list = get().properties;
            const item = { ...i, id: crypto.randomUUID() };
            set({
                properties: [item, ...list],
                currentProperty: CarPropertyEntity
            });
        }
    },
    setImagesList: (i) => {
        const list = (i || []).slice(0, 4).map((a, key) => ({
            ...a,
            uid: key + 1
        }));
        set({ imagesList: list });
    },
    setIsLoading: (i) => {
        set({ isLoading: i });
    },
    setDataList: (i) => {
        const { data, links, meta } = i;
        set({
            dataList: data || [],
            meta: meta || MetaEntity,
            links: links || MetaLinksEntity,
            isLoading: false,
        });
    },
    setImage: (e, uid) => {
        let file: File | null = null;

        // Unpack event payload dynamically if it comes from standard target input element
        if (e && 'target' in e && e.target.files) {
            file = e.target.files[0];
        } else if (e instanceof File) {
            file = e;
        }

        if (!file) return;

        const list = get().imagesList;
        set({
            imagesList: list.map((a) => String(uid) === String(a.uid) ? { ...a, imageFile: file } : { ...a })
        });
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({ search: value });
    },
    setIsSearching: (i) => {
        set({ isSearching: i });
    },
    setToggleModal: (i) => {
        set({ toggleModal: i });
    },
    setIsSubmitting: (i) => {
        set({ isSubmitting: i });
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
    setData: (i) => {
        set({
            data: i ? i : CarEntity,
            preData: i ? i : CarEntity,
            isLoading: false,
        });
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        });
    },
    resetData: () => {
        set({
            data: CarEntity,
            preData: CarEntity,
            properties: [],
            imagesList: CarImageListEntity || [],
            imagesDeleted: []
        });
    },
    setMessage: (i) => {
        set({ message: i });
    },
    clearErrors: () => {
        set({ errors: CarEntity });
    },
    validateField: (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value || !value.trim()) {
                    error = "Name is required.";
                }
                break;
            default:
                break;
        }
        return error;
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...CarEntity };
        let hasError = false;

        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
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
            const res = await _carViewAction(i);
            if (res && res.data) {
                // Ensure dynamic mapping with sequential unique identifier keys right away
                const backendImages = res.data.images ? res.data.images : [];
                const formattedImages = backendImages.map((img: any, index: number) => ({
                    ...img,
                    uid: index + 1
                }));

                set({
                    data: res.data,
                    properties: res.data.properties ? res.data.properties : [],
                    imagesList: formattedImages,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: CarEntity,
                    preData: CarEntity,
                    properties: [],
                    imagesList: CarImageListEntity || [],
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error fetching car view data: ${error}`);
            set({
                data: CarEntity,
                preData: CarEntity,
                properties: [],
                imagesList: CarImageListEntity || [],
                isLoading: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _carListAction();
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res?.data || [],
                    meta: res?.meta || MetaEntity,
                    links: res?.links || MetaLinksEntity,
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
            const res = await _carSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res?.data || [],
                    meta: res?.meta || MetaEntity,
                    links: res?.links || MetaLinksEntity,
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
            const res = await _carPaginateAction(url);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res?.data || [],
                    meta: res?.meta || MetaEntity,
                    links: res?.links || MetaLinksEntity,
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