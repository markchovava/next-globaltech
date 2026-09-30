"use client"

import Logo from "../logos/Logo"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import IconLink from "../icons/IconLink"
import Heading2 from "../headings/Heading2"
import { NavData, OtherLinksData } from "@/_data/sample/NavData"
import ListItemLink from "../lists/items/ListItemLink"
import { motion, Transition } from "motion/react"

const easeOut = [0.16, 1, 0.3, 1] as const

const logoTransition: Transition = {
    duration: 0.9,
    ease: easeOut,
}

const socialTransition = (index: number): Transition => ({
    type: "spring",
    stiffness: 260,
    damping: 18,
    delay: 0.2 + index * 0.08,
})

const columnTransition = (delay: number): Transition => ({
    duration: 1,
    delay,
    ease: easeOut,
})

const rowTransition = (delay: number, index: number): Transition => ({
    duration: 0.6,
    delay: delay + 0.15 + index * 0.08,
    ease: easeOut,
})

const bottomBarTransition: Transition = {
    duration: 0.9,
    delay: 0.6,
    ease: easeOut,
}

export default function Footer() {
    return (
        <section className="w-full bg-cyan-900 text-gray-100 py-28 overflow-hidden">
            <div className="container__primary grid lg:grid-cols-3 grid-cols-1 gap-8">
                <div className="space-y-8">
                    <motion.div
                        className="flex"
                        initial={{ opacity: 0, y: -16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={logoTransition}
                    >
                        <div className="py-1 rounded-lg">
                            <Logo />
                        </div>
                    </motion.div>

                    <div className="flex items-center justify-start gap-3">
                        {AppInfoData.socials.map((i, key) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={socialTransition(key)}
                                whileHover={{ y: -4, scale: 1.12 }}
                            >
                                <IconLink href={i.href} iconType={i.name} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={columnTransition(0.15)}
                >
                    <Heading2 name="Navigation" color="text-white" />
                    <ul className="flex flex-col gap-4 text-sm">
                        {NavData.map((i, key) => (
                            <motion.li
                                key={key}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={rowTransition(0.15, key)}
                                whileHover={{ x: 4 }}
                            >
                                <ListItemLink name={i.name} href={i.href} />
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={columnTransition(0.3)}
                >
                    <Heading2 name="Important Links" color="text-white" />
                    <ul className="flex flex-col gap-4 text-sm">
                        {OtherLinksData.map((i, key) => (
                            <motion.li
                                key={key}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={rowTransition(0.3, key)}
                                whileHover={{ x: 4 }}
                            >
                                <ListItemLink name={i.name} href={i.href} />
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            <motion.div
                className={`container__primary border-t border-cyan-800 mt-16 pt-2 flex 
                items-center justify-end text-sm text-gray-300`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={bottomBarTransition}
            >
                <p>&copy; {new Date().getFullYear()} Developed and Maintained by FL Designers.</p>
            </motion.div>
        </section>
    )
}