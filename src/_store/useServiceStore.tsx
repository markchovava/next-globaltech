"use client"

import { ServiceEntity, ServiceInterface } from "@/_data/entity/ServiceEntity"
import { create } from "zustand"


interface Props {
    isLoading: boolean
    datalist: ServiceInterface[]
    data: ServiceInterface
    setData: (i: ServiceInterface) => void
    setDatalist: (i: ServiceInterface[]) => void
}


export const useServiceStore = create<Props>((set, get) => ({
    isLoading: true,
    datalist: [],
    data: ServiceEntity,
    setDatalist: (i) => {
        set({
            datalist: i
        })
    },
    setData: (i) => {
        set({
            data: i,
            isLoading: false,
        })
    },
}))