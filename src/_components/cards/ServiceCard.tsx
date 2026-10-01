"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import IconDefault from "../icons/IconDefault"
import { NoImageData } from "@/_data/sample/NoImage"
import { useQuoteStore } from "@/_store/useQuoteStore"
import { ServiceInterface } from "@/_data/entity/ServiceEntity"

interface Props {
    image?: string
    data: ServiceInterface
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function ServiceCard({
    data,
    image = NoImageData
}: Props) {
    const { setService, setToggleModal } = useQuoteStore()

    const safeImage =
        typeof image === "string" && image.trim().length > 0 ? image : NoImageData

    const reduceMotion = useReducedMotion()
    const rootRef = useRef<HTMLDivElement>(null)
    const lastPointer = useRef<string>("mouse")

    // "active" = description visible. Driven by mouse hover, keyboard focus, or a tap (touch/pen).
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const [tapped, setTapped] = useState(false)
    const active = hovered || focused || tapped

    // ---- tilt + parallax (mouse only, skipped for reduced motion) ----
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const spring = { stiffness: 150, damping: 20, mass: 0.5 }
    const tilt = reduceMotion ? 0 : 8
    const drift = reduceMotion ? 0 : 12
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tilt, -tilt]), spring)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tilt, tilt]), spring)
    const imgX = useSpring(useTransform(x, [-0.5, 0.5], [-drift, drift]), spring)
    const imgY = useSpring(useTransform(y, [-0.5, 0.5], [-drift, drift]), spring)

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (e.pointerType !== "mouse") return
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    function resetTilt() {
        x.set(0)
        y.set(0)
    }

    // Close a tapped card when the user taps elsewhere
    useEffect(() => {
        if (!tapped) return
        function onOutside(e: PointerEvent) {
            if (!rootRef.current?.contains(e.target as Node)) setTapped(false)
        }
        document.addEventListener("pointerdown", onOutside)
        return () => document.removeEventListener("pointerdown", onOutside)
    }, [tapped])

    return (
        <motion.div
            ref={rootRef}
            tabIndex={0}
            role="group"
            aria-label={typeof name === "string" ? name : undefined}
            aria-expanded={active}
            // pointer handling
            onPointerDown={(e) => { lastPointer.current = e.pointerType }}
            onPointerEnter={(e) => { if (e.pointerType === "mouse") setHovered(true) }}
            onPointerMove={handlePointerMove}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHovered(false)
                resetTilt()
            }}
            onClick={() => {
                // Touch/pen: tap toggles. Mouse users already get hover.
                if (lastPointer.current !== "mouse") setTapped((v) => !v)
            }}
            // keyboard handling
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
            }}
            onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    setTapped((v) => !v)
                }
            }}
            style={{ perspective: 800 }}
            initial="rest"
            animate={active ? "active" : "rest"}
            className="md:h-120 h-100 drop-shadow-md relative group cursor-pointer rounded-xl overflow-hidden
                       outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2"
        >
            {/* image layer: tilt + entrance zoom + parallax + hover zoom + light sweep */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="bg-gray-400 w-full absolute h-full z-10"
            >
                <motion.div
                    style={{ x: imgX, y: imgY }}
                    initial={{ opacity: 0, scale: 1.3 }}
                    whileInView={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 1.1, ease: EASE_OUT }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                >
                    <motion.div
                        variants={{ rest: { scale: 1 }, active: { scale: reduceMotion ? 1 : 1.08 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <Image
                            alt={typeof name === "string" ? name : "Service image"}
                            src={safeImage}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>

                {!reduceMotion && (
                    <motion.div
                        variants={{
                            rest: { x: "-120%", opacity: 0 },
                            active: { x: "120%", opacity: 1 },
                        }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="absolute inset-0 z-10 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none"
                    />
                )}
            </motion.div>

            {/* scrim: light at rest, deeper when the description is showing so text stays readable */}
            <motion.div
                variants={{ rest: { opacity: 0.7 }, active: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                className="absolute z-12 inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent pointer-events-none"
            />

            <button
                aria-label={`View ${typeof name === "string" ? name : "service"}`}
                onClick={(e) => {
                    e.stopPropagation()
                    setToggleModal(true)
                    setService(data)
                }}
            >
                <PointerButton />
            </button>

            {/* text block is anchored to the bottom, so the title rises as the description grows */}
            <div className="absolute z-20 bottom-0 left-0 w-full py-6 px-5 text-white">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setToggleModal(true)
                        setService(data)
                    }}>
                    <h4 className="text-x text-start font-medium">
                        {data.name}
                    </h4>
                </button>

                <motion.div
                    variants={{
                        rest: { height: 0, opacity: 0, y: 12 },
                        active: {
                            height: "auto",
                            opacity: 1,
                            y: 0,
                            transition: {
                                height: { duration: 0.4, ease: EASE_OUT },
                                opacity: { duration: 0.3, delay: 0.1 },
                                y: { duration: 0.4, ease: EASE_OUT, delay: 0.05 },
                            },
                        },
                    }}
                    transition={{ duration: 0.25, ease: "easeIn" }}
                    className="overflow-hidden"
                >
                    <p className="pt-2 text-sm leading-relaxed text-white/85 line-clamp-4">
                        {data.desc}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

function PointerButton() {
    return (
        <motion.div
            variants={{
                rest: { scale: 1, backgroundColor: "#164e63" }, // cyan-900
                active: { scale: 1.08, backgroundColor: "#083344" }, // cyan-950
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileTap={{ scale: 0.92 }}
            className="absolute cursor-pointer flex items-center justify-center z-15
                       top-[5%] right-[5%] h-12 w-12 rounded-full overflow-hidden"
        >
            <motion.span
                className="inline-block"
                variants={{ rest: { rotate: -45 }, active: { rotate: 0 } }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <IconDefault type="right-long" css="text-white" />
            </motion.span>
        </motion.div>
    )
}