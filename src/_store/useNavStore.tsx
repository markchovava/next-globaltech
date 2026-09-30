"use client"

import { NavEntity, NavInterface } from "@/_data/entity/NavEntity";
import { NavData } from "@/_data/sample/NavData";
import { create } from "zustand";



interface PropInterface {
    isHome: boolean
    navList: NavInterface[]
    current: NavInterface
    toggleMenu: boolean
    setToggleMenu: (i: boolean) => void
    setNavList: (i: NavInterface[]) => void
    setCurrent: (i: NavInterface) => void
}


export const useNavStore = create<PropInterface>((set, get) => ({
    isHome: false,
    navList: NavData,
    current: NavEntity,
    toggleMenu: false,
    isMenu: false,
    setToggleMenu: (i) => {
        set({
            toggleMenu: i
        })
    },
    setCurrent: (i) => {
        set({
            current: i
        })
    },
    setNavList: (i) => {
        set({
            navList: i
        })
    },

}))