"use client"

import { useRef } from "react"
import Image from "next/image"
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    type Variants,
} from "motion/react"
import { ClientInterface } from "@/_data/entity/ClientEntity"

interface Props {
    list?: ClientInterface[]
    title?: string
    subtitle?: string
}

/* ---------- animation variants ---------- */

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

/* ---------- client card with cursor spotlight ---------- */

export default function ClientCard({ client }: { client: ClientInterface }) {
    const mouseX = useMotionValue(-200)
    const mouseY = useMotionValue(-200)

    const spotlight = useMotionTemplate`radial-gradient(160px circle at ${mouseX}px ${mouseY}px, rgba(6,182,212,0.22), transparent 70%)`

    return (
        <motion.div
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left)
                mouseY.set(e.clientY - rect.top)
            }}
            onMouseLeave={() => {
                mouseX.set(-200)
                mouseY.set(-200)
            }}
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative mx-3 flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur-md md:h-28 md:w-56"
        >
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: spotlight }}
            />
            <Image
                src={client.image}
                alt={client.name}
                width={400}
                height={300}
                draggable={false}
                className="relative h-full w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
        </motion.div>
    )
}

