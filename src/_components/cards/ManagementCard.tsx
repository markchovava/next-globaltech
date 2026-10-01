"use client"

import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import Image from "next/image"
import { MontserratSemiBold } from "@/_assets/fonts/montserrat/_MontserratFont"
import { ManagementInterface } from "@/_data/entity/ManagementEntity"
import { NoImageData } from "@/_data/sample/NoImage"





const spring = { type: "spring", stiffness: 260, damping: 22 } as const


export default function ManagementCard({
    data,
    image = NoImageData,
}: {
    image?: string
    data: ManagementInterface
}) {
    const [hovered, setHovered] = useState(false)
    const reduce = useReducedMotion()

    // Inherits "hidden" / "show" from the parent grid.
    const card: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    }

    // Photo is unmasked from the bottom up.
    const photo: Variants = {
        hidden: { clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
        show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
    }

    return (
        <motion.article
            variants={card}
            whileHover={reduce ? undefined : { y: -6 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            transition={spring}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={0}
            className="group relative grid grid-cols-5 gap-4 overflow-hidden rounded-2xl bg-white outline-none
                       drop-shadow-lg focus-visible:ring-2 focus-visible:ring-cyan-700"
        >
            {/* Photo */}
            <div className="col-span-2">
                <motion.div variants={photo} className="relative h-80 w-full overflow-hidden bg-gray-200">
                    <motion.div
                        className="h-full w-full"
                        animate={{ scale: hovered && !reduce ? 1.08 : 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src={image}
                            alt={data.name}
                            width={300}
                            height={400}
                            className={`h-full w-full object-cover`}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Details */}
            <div className="col-span-3 flex flex-col justify-center space-y-2 py-4 pr-5">
                <motion.h3
                    className={`${MontserratSemiBold.className} text-lg`}
                    animate={{ x: hovered && !reduce ? 6 : 0 }}
                    transition={spring}
                >
                    {data.name}
                </motion.h3>

                <p className="text-sm italic text-cyan-700">{data.position}</p>

                {/* Accent line draws in on hover */}
                <motion.span
                    aria-hidden
                    className="block h-0.5 w-full origin-left rounded-full bg-cyan-700"
                    initial={false}
                    animate={{ scaleX: hovered ? 1 : 0.15 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="text-sm text-gray-700">{data.qualifications}</div>
            </div>
        </motion.article>
    )
}