"use client"

import { useEffect, useRef } from "react"
import {
    animate,
    motion,
    MotionConfig,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type Variants,
} from "motion/react"
import { MontserratBold } from "@/_assets/fonts/montserrat/_MontserratFont"
import IconDefault from "../icons/IconDefault"
import Spacer from "../spacers/Spacer"
import { AppInfoData } from "@/_data/sample/AppinfoData"

/* Card slides up, then its children (icon, number, bar, text) follow */
const gridVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
}
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
}
const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.15 },
    },
}
const barVariants: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.6, delay: 0.35, ease: "easeOut" } },
}

export default function ExperienceSection() {
    return (
        <MotionConfig reducedMotion="user">
            <section aria-label="Our experience">
                <Spacer />

                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative mx-auto grid container__primary grid-cols-1 divide-y divide-white/15 overflow-hidden rounded-2xl bg__primary shadow-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:w-[80%]"
                >
                    {/* Soft light in the corner, purely decorative */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%)]"
                    />

                    {AppInfoData.experience.list.map((i, key) => (
                        <ExperienceItem
                            key={key}
                            icon={i.icon}
                            desc={i.desc}
                            title={i.title}
                        />
                    ))}
                </motion.div>

                <Spacer />
            </section>
        </MotionConfig>
    )
}

/* ------------------------------------------------------------------ */
/*  Item                                                               */
/* ------------------------------------------------------------------ */
interface eProps {
    icon: string
    title: string
    desc: string
}

function ExperienceItem({ icon, title, desc }: eProps) {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative flex flex-col items-center gap-4 px-4 py-8 transition-colors duration-300 hover:bg-white/5"
        >
            {/* Icon with a ring that expands on hover */}
            <motion.div variants={iconVariants} className="relative">
                <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-white/40 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-0"
                />
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                    <IconDefault type={icon} css="text-5xl text-cyan-700" />
                </div>
            </motion.div>

            <h4
                className={`${MontserratBold.className} text-center text-3xl tabular-nums text-white md:text-5xl`}
            >
                <CountUp value={title} />
            </h4>

            <motion.span
                aria-hidden
                variants={barVariants}
                className="h-0.5 w-10 origin-center rounded-full bg-white/50"
            />

            <p className="text-center text-base text-cyan-50 sm:text-lg">{desc}</p>
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/*  Count-up: "10+" counts 0 → 10 then keeps the "+".                  */
/*  Titles with no number (e.g. "Award winning") render unchanged.     */
/* ------------------------------------------------------------------ */
function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
    const reduce = useReducedMotion()
    const count = useMotionValue(0)

    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
    const prefix = match?.[1] ?? ""
    const numStr = match?.[2] ?? ""
    const suffix = match?.[3] ?? ""

    const target = parseFloat(numStr.replace(/,/g, ""))
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0
    const grouped = numStr.includes(",")

    const text = useTransform(count, (v) =>
        v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouped,
        })
    )

    useEffect(() => {
        if (!match || !inView) return
        if (reduce) {
            count.set(target)
            return
        }
        const controls = animate(count, target, { duration: 1.6, ease: [0.25, 1, 0.5, 1] })
        return () => controls.stop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, reduce, target])

    if (!match) return <>{value}</>

    return (
        // Screen readers get the real value immediately; the ticking digits are decoration
        <span ref={ref} aria-label={value}>
            <span aria-hidden>
                {prefix}
                <motion.span>{text}</motion.span>
                {suffix}
            </span>
        </span>
    )
}