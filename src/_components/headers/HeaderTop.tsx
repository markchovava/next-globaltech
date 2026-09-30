"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import IconDefault from "../icons/IconDefault"
import { AppInfoData } from "@/_data/sample/AppinfoData"

/* ------------------------------------------------------------------ */
/*  Office hours (Harare time). Change these to match your real hours. */
/* ------------------------------------------------------------------ */
const TIME_ZONE = "Africa/Harare"
const OPEN_HOUR = 8
const CLOSE_HOUR = 17
const WORK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]

type OfficeStatus = { open: boolean; time: string } | null

/** Live office status. Starts as null so server and client HTML match (no hydration warning). */
function useOfficeStatus(): OfficeStatus {
    const [status, setStatus] = useState<OfficeStatus>(null)

    useEffect(() => {
        const read = () => {
            const now = new Date()
            const parts = new Intl.DateTimeFormat("en-GB", {
                timeZone: TIME_ZONE,
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }).formatToParts(now)

            const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
            const hour = parseInt(get("hour"), 10)
            const day = get("weekday")

            setStatus({
                open: WORK_DAYS.includes(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR,
                time: `${get("hour")}:${get("minute")}`,
            })
        }

        read()
        const id = setInterval(read, 30_000)
        return () => clearInterval(id)
    }, [])

    return status
}

export default function HeaderTop() {
    const status = useOfficeStatus()

    return (
        <section className="w-full border-b border-gray-200 bg-white py-2">
            <div className="container__primary flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                {/* LEFT: contact */}
                <ul className="flex  items-center gap-x-4 gap-y-1">
                    <ContactItem
                        type="email"
                        label={AppInfoData.email}
                        href={`mailto:${AppInfoData.email}`}
                    /* copyValue={AppInfoData.email} */
                    />
                    <ContactItem
                        type="phone"
                        label={AppInfoData.phone}
                        href={`tel:${AppInfoData.phone.replace(/[^\d+]/g, "")}`}
                    />
                </ul>

                {/* RIGHT: status + socials */}
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <OfficeBadge status={status} />

                    <span aria-hidden className="hidden h-4 w-px bg-gray-200 sm:block" />

                    <ul className="flex items-center gap-1">
                        {AppInfoData.socials.map((i, key) => (
                            <SocialItem
                                key={key}
                                href={i.href}
                                name={i.name}
                                css={i.iconCss}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Office badge: the one memorable element                            */
/* ------------------------------------------------------------------ */
function OfficeBadge({ status }: { status: OfficeStatus }) {
    const reduce = useReducedMotion()

    // Reserve the space while loading so the bar doesn't jump
    if (!status) return <span className="h-6 w-40" aria-hidden />

    const open = status.open

    return (
        <p
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${open ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                }`}
        >
            <span className="relative flex h-2 w-2">
                {open && !reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                />
            </span>
            <span>
                {open ? "We're currently Open Now" : "We're Closed Now, we reply next working day"}
            </span>
            <span className="hidden tabular-nums text-gray-500 md:inline">
                Harare {status.time}
            </span>
        </p>
    )
}

/* ------------------------------------------------------------------ */
/*  Contact item (real mailto/tel links, optional copy button)         */
/* ------------------------------------------------------------------ */
interface cProps {
    type: string
    label: string
    href: string
    copyValue?: string
}
function ContactItem({ type, label, href, copyValue }: cProps) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        if (!copyValue) return
        try {
            await navigator.clipboard.writeText(copyValue)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            /* clipboard blocked: the mailto link still works */
        }
    }

    return (
        <li className="group flex items-center gap-1.5 text-sm text-gray-700">
            <Link
                href={href}
                target="_blank"
                className="flex items-center gap-1.5 rounded transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                <IconDefault type={type} css="text-cyan-600" />
                {label}
            </Link>

            {copyValue && (
                <button
                    type="button"
                    onClick={copy}
                    aria-label={`Copy ${copyValue}`}
                    className="relative hidden h-5 min-w-12 items-center justify-center rounded bg-gray-100 px-1.5 text-xs text-gray-600 opacity-0 transition-opacity hover:bg-cyan-50 hover:text-cyan-700 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-cyan-600 group-hover:opacity-100 sm:inline-flex"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={copied ? "done" : "copy"}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.12 }}
                        >
                            {copied ? "Copied" : "Copy"}
                        </motion.span>
                    </AnimatePresence>
                </button>
            )}
        </li>
    )
}

/* ------------------------------------------------------------------ */
/*  Social item                                                        */
/* ------------------------------------------------------------------ */
interface sProps {
    href?: string
    name: string
    css?: string
}
function SocialItem({ href = "#", name, css = "text-black" }: sProps) {
    const external = href.startsWith("http")

    return (
        <li>
            <Link
                href={href}
                aria-label={name}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-8 w-8 items-center justify-center rounded-full text-lg transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-cyan-600"
            >
                <motion.span
                    className="flex"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.85 }}
                >
                    <IconDefault type={name} css={css} />
                </motion.span>

                {/* Tooltip */}
                <span
                    role="tooltip"
                    className="pointer-events-none absolute top-full z-10 mt-1 whitespace-nowrap rounded bg-gray-900 px-2 py-0.5 text-xs capitalize text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                    {name}
                </span>
            </Link>
        </li>
    )
}