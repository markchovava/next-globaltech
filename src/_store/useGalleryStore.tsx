"use client"

import { GalleryEntity, GalleryInterface } from "@/_data/entity/GalleryEntity"
import { _galleryPaginateAction, galleryPaginateAction } from "@/app/admin/_data/actions/GalleryActions"
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/app/admin/_data/entity/ResponseEntity"
import { create } from "zustand"

interface Props {
    isLoading: boolean
    toggleModal: boolean
    meta: MetaInterface,
    links: MetaLinksInterface,
    setToggleModal: (i: boolean) => void
    datalist: GalleryInterface[]
    data: GalleryInterface
    setDatalist: (i: ResponseInterface) => void
    setData: (i: GalleryInterface) => void
    getPaginatedDatalist: (url: string) => Promise<void>
}

export const useGalleryStore = create<Props>((set, get) => ({
    isLoading: true,
    datalist: [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: GalleryEntity,
    toggleModal: false,
    setToggleModal: (i) => {
        set({
            toggleModal: i
        })
    },
    setDatalist: (i) => {
        const { data, links, meta } = i
        set({
            datalist: data,
            meta: meta,
            links: links,
            isLoading: false,
        })
    },
    setData: (i) => {
        set({
            data: i,
            isLoading: false,
        })
    },
    getPaginatedDatalist: async (url: string) => {
        set({ isLoading: true });
        try {
            const res = await galleryPaginateAction(url);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    datalist: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    datalist: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                datalist: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
}))