"use client"




import { AppInfoEntity, AppInfoInterface } from "@/_data/entity/AppInfoEntity"
import { create } from "zustand"

interface Props {
    isLoading: boolean
    data: AppInfoInterface
    setData: (i: AppInfoInterface) => void
}

export const useAppInfoStore = create<Props>((set, get) => ({
    isLoading: true,
    data: AppInfoEntity,
    setData: (i) => {
        set({
            data: i,
            isLoading: false,
        })
    },

}))