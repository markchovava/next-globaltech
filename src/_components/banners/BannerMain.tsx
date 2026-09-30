"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react"
import Button from "../buttons/Button"
import Typewriter from "../effects/Typescript"
import { AppInfoData } from "@/_data/sample/AppinfoData"



/* One orchestrated entrance: heading, tagline, button arrive in sequence */
const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
}
const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
}

/** True from the `lg` breakpoint (1024px) up. Starts false so the server renders the mobile version. */
function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)")
        const update = () => setIsDesktop(mq.matches)
        update()
        mq.addEventListener("change", update)
        return () => mq.removeEventListener("change", update)
    }, [])

    return isDesktop
}

interface Props {
    /** Optional. Without it the banner falls back to a plain dark background. */
    image?: string
}

export default function BannerMain({ image }: Props) {
    const isDesktop = useIsDesktop()
    const reduce = useReducedMotion()

    // Parallax: desktop only, and only if the visitor hasn't asked for less motion
    const parallax = isDesktop && !reduce
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 640], [0, 80])

    return (
        <section className="relative h-136 w-full overflow-hidden bg-gray-900 text-gray-50 lg:h-160">
            {/*
              IMAGE
              Mobile: fills the banner and stays still.
              Desktop: starts 80px above the top edge (lg:-top-20) so the parallax never shows a gap.
              It is one <Image>, so the file is only downloaded once.
            */}
            {image && (
                <motion.div
                    style={parallax ? { y } : undefined}
                    className="absolute inset-x-0 bottom-0 top-0 z-10 lg:-top-20"
                >
                    <Image
                        src={image}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </motion.div>
            )}

            {/* SCRIM: dark on the text side so copy stays readable on any photo */}
            <div aria-hidden className="absolute inset-0 z-20 bg-black/5" />
            <div
                aria-hidden
                className="absolute inset-0 z-20 bg-linear-to-r from-black/80 via-black/45 to-transparent"
            />

            {/* CONTENT */}
            <div className="container__primary relative z-30 flex h-full items-center">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl"
                >
                    <motion.h1
                        variants={item}
                        className="mb-4 font-serif text-4xl leading-tight sm:text-5xl"
                    >
                        Welcome to{" "}
                        <span className="block min-h-[1.2em] text-cyan-400">
                            <Typewriter words={AppInfoData.phrases} />
                        </span>
                    </motion.h1>

                    <motion.p variants={item} className="mb-6 text-lg sm:text-xl">
                        {AppInfoData.tagline}
                    </motion.p>

                    <motion.div variants={item}>
                        <Link href="/about">
                            <Button name="About Us" css="text-lg py-3 px-9 text-white" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}