"use client"

import { motion, useReducedMotion, type Transition } from "motion/react"

interface Props {
    name: string
    image: string
}

const smoothTransition = (delay: number): Transition => ({
    duration: 0.8,
    delay,
    ease: [0.25, 1, 0.5, 1] as const,
})

export default function HeaderSecondary({ name, image }: Props) {
    const reduceMotion = useReducedMotion()

    return (
        <header className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden text-gray-50 bg-amber-900">
            {/* IMAGE (bg-fixed only on desktop; iOS Safari doesn't support it) */}
            <div
                aria-hidden="true"
                style={{ backgroundImage: image ? `url(${image})` : undefined }}
                className="absolute inset-0 z-10 bg-center bg-cover lg:bg-fixed"
            />

            {/* OVERLAYS: flat tint for mobile legibility + directional gradient */}
            <div aria-hidden="true" className="absolute inset-0 z-20 bg-black/30" />
            <div
                aria-hidden="true"
                className="absolute inset-0 z-20 bg-linear-to-bl from-black/90 to-transparent"
            />

            {/* CONTENT (single h1 for all breakpoints) */}
            <div className="absolute inset-0 z-30">
                <div className="container__primary h-full flex items-center justify-center px-4 sm:px-6">
                    <motion.h1
                        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={smoothTransition(0.2)}
                        className="font-serif text-center text-balance wrap-break-word leading-tight text-4xl sm:text-5xl lg:text-7xl"
                    >
                        {name}
                    </motion.h1>
                </div>
            </div>
        </header>
    )
}