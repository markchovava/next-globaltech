"use client"

import { NavData } from "@/_data/sample/NavData"
import Logo from "../logos/Logo"
import NavItem from "../navs/NavItem"
import HeaderResponsive from "./HeaderResponsive"
import ButtonMenu from "../buttons/ButtonMenu"
import { motion, type Transition } from "motion/react"
import Link from "next/link"
import Button from "../buttons/Button"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import Typescript from "../effects/Typescript"



// Fixed TypeScript type definition for motion transition
const smoothTransition = (delay: number): Transition => ({
    duration: 0.8,
    delay,
    ease: [0.25, 1, 0.5, 1] as const,
})


interface Props {
    image: string
}

export default function Header({ image }: Props) {
    return (
        <>
            <header className="w-full h-160 relative text-gray-50">
                {/* IMAGE / COLOR */}
                <section style={{ backgroundImage: `url(${image})` }} className="absolute bg-center bg-cover lg:bg-fixed z-10 top-0 left-0 w-full h-full bg-amber-900">
                    {/*  <Image src={image} width={1280} height={720} alt="Banner" className="w-full h-full object-cover" /> */}
                </section>
                {/* BG GRADIENT SHADOW */}
                <section className="absolute z-20 top-0 left-0 w-full h-full bg-linear-to-bl from-black/90 to-transparent">
                </section>

                {/* MAIN CONTENT - DESKTOP */}
                <section className="lg:block hidden w-full h-full absolute z-30 top-0 left-0">
                    <div className="container__primary h-full flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={smoothTransition(0.1)}
                            className="w-full flex items-center justify-between py-3">
                            <Logo textCss='text-3xl text-gray-50' />
                            <ul className='flex items-center gap-6'>
                                {NavData.map((i, key) => (
                                    <NavItem
                                        key={key}
                                        name={i.name}
                                        href={i.href} />
                                ))}
                            </ul>
                        </motion.div>

                        <div className="w-[70%]">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.2)}
                                className="text-5xl font-serif mb-4">
                                Welcome to <Typescript words={AppInfoData.phrases} />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.3)}
                                className="text-xl mb-6">
                                {AppInfoData.tagline}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.4)} >
                                <Link href={`/about`}>
                                    <Button
                                        name={`About Us`}
                                        css="text-lg py-3 px-9 text-white"
                                    />
                                </Link>
                            </motion.div>
                        </div>
                        <div className="h-10 w-full"></div>
                    </div>
                </section>







                {/* MAIN CONTENT - MOBILE */}
                <section className="lg:hidden block w-full h-full absolute z-30 top-0 left-0">
                    <div className="container__primary h-full flex flex-col justify-between">
                        <div className='w-full flex items-center justify-between py-3'>
                            <Logo textCss='text-3xl text-gray-50' />
                            <ButtonMenu color="text-gray-50" />
                        </div>

                        <div className="w-[90%]">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.2)}
                                className="text-6xl font-serif mb-6">
                                {AppInfoData.intro}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.3)}
                                className="text-xl mb-8">
                                {AppInfoData.intro}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={smoothTransition(0.4)} >
                                <Link href={`/what-we-do`}>
                                    <Button
                                        name={`What We Do`}
                                        css="text-lg py-3 px-9 text-white"
                                    />
                                </Link>
                            </motion.div>
                        </div>
                        <div className="h-10 w-full"></div>
                    </div>
                </section>
            </header>

            <HeaderResponsive />
        </>
    )
}