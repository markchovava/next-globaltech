"use client"

import { MontserratLight } from "@/_assets/fonts/montserrat/_MontserratFont"
import IconDefault from "../icons/IconDefault"
import { motion, Transition } from "motion/react"

const cardTransition = (delay: number): Transition => ({
    duration: 1.1,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
})

const iconTransition = (delay: number): Transition => ({
    type: "spring",
    stiffness: 180,
    damping: 14,
    delay: delay + 0.15, // icon pops slightly after the card starts appearing
})

const textTransition = (delay: number): Transition => ({
    duration: 0.9,
    delay: delay + 0.3, // text follows the icon
    ease: [0.16, 1, 0.3, 1] as const,
})

const STAGGER_STEP = 0.18 // seconds between each card's entrance

export default function SectionTrioText() {
    return (
        <section>
            <div className="container__primary grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, key) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={cardTransition(key * STAGGER_STEP)}
                    >
                        <Section index={key} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

function Section({ index }: { index: number }) {
    const delay = index * STAGGER_STEP

    return (
        <div className="space-y-6 px-6 py-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -35 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={iconTransition(delay)}
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="flex items-center justify-center h-15 w-15 rounded-full overflow-hidden bg-green-900"
            >
                <IconDefault type="" css="text-2xl text-neutral-200" />
            </motion.div>

            <div>
                <motion.h4
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={textTransition(delay)}
                    className={`${MontserratLight.className} text-2xl mb-3`}>
                    Our Approach
                </motion.h4>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ ...textTransition(delay), delay: delay + 0.4 }}
                    className="mb-2">
                    We value our customers and encourage you to visit us during normal business hours
                    to explore our expert consulting solutions. Our team is dedicated to enhancing
                    your operational efficiency.
                </motion.p>
            </div>
        </div>
    )
}