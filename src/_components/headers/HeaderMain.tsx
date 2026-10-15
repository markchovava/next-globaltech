"use client"

import { useEffect, useState } from "react"
import { NavData } from "@/_data/sample/NavData"
import Logo from "../logos/Logo"
import NavItem from "../navs/NavItem"
import HeaderMainResponsive from "./HeaderMainResponsive"
import ButtonMenu from "../buttons/ButtonMenu"
import BannerMain from "../banners/BannerMain"
import HeaderTop from "./HeaderTop"
import { useAppInfoStore } from "@/_store/useAppInfoStore"
import { AppInfoEntity } from "@/_data/entity/AppInfoEntity"
import { AppInfoData } from "@/_data/sample/AppinfoData"



interface Props {
    appData?: any
}
export default function HeaderMain({ appData }: Props) {
    const [scrolled, setScrolled] = useState(false)
    const { setData, data } = useAppInfoStore()

    useEffect(() => {
        setData({
            ...AppInfoEntity,
            email: AppInfoData.email,
            address: appData.data.address ?? AppInfoData.address,
            emailList: AppInfoData.emailList,
            name: appData.data.name ?? AppInfoData.name,
            phone: appData.data.phone ?? AppInfoData.phone,
            facebook: appData.data.facebook ?? '#',
            instagram: appData.data.instagram ?? '#',
            tiktok: appData.data.tiktok ?? '#',
            linkedin: appData.data.linkedin ?? '#',
        })
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <>
            <HeaderTop />

            {/* Sticky bar: the contact strip scrolls away, the nav stays */}
            <div
                className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-100"
                    }`}
            >
                {/* DESKTOP */}
                <section className="hidden w-full py-2 lg:block">
                    <div className="container__primary flex items-center justify-between">
                        <Logo iconCss={scrolled ? "h-14" : "h-20"} />
                        <nav aria-label="Main">
                            <ul className="flex items-center gap-8">
                                {NavData.map((i, key) => (
                                    <NavItem key={key} name={i.name} href={i.href} />
                                ))}
                            </ul>
                        </nav>
                    </div>
                </section>

                {/* MOBILE */}
                <section className="block w-full lg:hidden">
                    <div className="container__primary flex items-center justify-between py-1">
                        <Logo iconCss="h-14" />
                        <ButtonMenu color="text-gray-800" />
                    </div>
                    <HeaderMainResponsive />
                </section>
            </div>

        </>
    )
}