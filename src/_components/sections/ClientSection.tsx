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
import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import { ClientsData } from "@/_data/sample/ClientsData"
import { ClientInterface } from "@/_data/entity/ClientEntity"
import ClientCard from "../cards/ClientCard"




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


export default function ClientSection({
    title = "The title",
    subtitle = "The subtitle",
    list = [],
}: Props) {
    const clients: ClientInterface[] = list.length ? list : ClientsData
    const mid = Math.ceil(clients.length / 2)
    const rowOne = clients.length > 3 ? clients.slice(0, mid) : clients
    const rowTwo = clients.length > 3 ? clients.slice(mid) : []

    return (
        <section className="relative w-full overflow-hidden">
            {/* ambient blobs */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
                animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl"
                animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <Spacer />

            <div className="container__primary relative">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-10"
                >
                    <motion.div variants={fadeUp}>
                        <TitleNormal name={title} title={subtitle} />
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { scaleX: 0, opacity: 0 },
                            show: {
                                scaleX: 1,
                                opacity: 1,
                                transition: { duration: 0.8, ease: "easeOut" },
                            },
                        }}
                        style={{ originX: 0 }}
                        className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    />
                </motion.div>
            </div>

            {/* full-bleed rows, opposite directions */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative space-y-4"
            >
                <MarqueeRow items={rowOne} speed={40} />
                {rowTwo.length > 0 && <MarqueeRow items={rowTwo} reverse speed={34} />}
            </motion.div>

            <Spacer />
        </section>
    )
}






/* ---------- infinite marquee (slows on hover) ---------- */

function MarqueeRow({
    items,
    reverse = false,
    speed = 40,
}: {
    items: ClientInterface[]
    reverse?: boolean
    speed?: number
}) {
    const x = useMotionValue(0)
    const trackRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()
    const speedFactor = useSpring(1, { stiffness: 90, damping: 20 })

    // repeat items so half the track always overflows the viewport
    const base = Array.from({
        length: Math.max(1, Math.ceil(8 / Math.max(items.length, 1))),
    }).flatMap(() => items)
    const loop = [...base, ...base]

    useAnimationFrame((_, delta) => {
        if (reduceMotion || !trackRef.current) return
        const half = trackRef.current.scrollWidth / 2
        const dir = reverse ? 1 : -1
        let next = x.get() + dir * speed * speedFactor.get() * (delta / 1000)

        if (next <= -half) next += half
        if (next >= 0 && reverse) next -= half
        x.set(next)
    })

    return (
        <div
            className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            onMouseEnter={() => speedFactor.set(0.15)}
            onMouseLeave={() => speedFactor.set(1)}
        >
            <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex w-max will-change-transform"
            >
                {loop.map((client, i) => (
                    <ClientCard key={`${client.name}-${i}`} client={client} />
                ))}
            </motion.div>
        </div>
    )
}