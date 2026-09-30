"use client"

import { MontserratLight } from "@/_assets/fonts/montserrat/_MontserratFont"
import IconDefault from "../icons/IconDefault"
import { motion, Transition } from "motion/react"
import { ReactNode } from "react"

const cardTransition = (delay: number): Transition => ({
    duration: 1.2,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
})

const iconTransition = (delay: number): Transition => ({
    type: "spring",
    stiffness: 170,
    damping: 15,
    delay: delay + 0.2,
})

const textTransition = (delay: number): Transition => ({
    duration: 0.9,
    delay: delay + 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
})

const STAGGER_STEP = 0.15


interface Props {
    data: any[]
}

export default function SectionDualText({
    data
}: Props) {
    return (
        <section>
            <div className="container__primary grid md:grid-cols-2 grid-cols-1 gap-6">
                {data.length > 0 && data.map((i, key) => {
                    // Left card enters from the left, right card enters from the right —
                    // on mobile (single column) this just reads as a horizontal slide-in.
                    const fromX = key === 0 ? -60 : 60

                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: fromX, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={cardTransition(key * STAGGER_STEP)} >
                            <Section
                                index={key}
                                name={i.name}
                                iconType={i.iconType}
                                details={i.details}
                            />
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}


interface sProps {
    name: string
    details: ReactNode
    index: number
    iconType?: string
}

function Section({ name, details, iconType = '', index }: sProps) {
    const delay = index * STAGGER_STEP

    return (
        <div className="bg-gray-50 rounded-lg overflow-hidden hover:drop-shadow-2xl px-6 py-8 space-y-6 transition__effect">
            <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -35 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={iconTransition(delay)}
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="flex items-center justify-center h-15 w-15 rounded-full overflow-hidden bg-amber-900">
                <IconDefault
                    type={iconType}
                    css="text-2xl text-white"
                />
            </motion.div>

            <div>
                <motion.h4
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={textTransition(delay)}
                    className={`${MontserratLight.className} text-2xl mb-3`} >
                    {name}
                </motion.h4>


                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ ...textTransition(delay), delay: delay + 0.6 }} >
                    {details}
                </motion.div>
            </div>
        </div>
    )
}