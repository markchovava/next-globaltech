"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useNavStore } from "../../_store/useNavStore"
import ButtonMenu from "../buttons/ButtonMenu"
import Logo from "../logos/Logo"
import IconDefault from "../icons/IconDefault"
import { NavData } from "@/_data/sample/NavData"
import { AppInfoData } from "@/_data/sample/AppinfoData"

/* Same matching rule as NavItem, so desktop and mobile agree on the active page */
function isActive(pathname: string, href: string) {
    if (href.startsWith("#")) return false
    const path = href.split("#")[0] || "/"
    return path === "/" ? pathname === "/" : pathname.startsWith(path)
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
}
const itemVariants = {
    hidden: { opacity: 0, x: 16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
}

export default function HeaderMainResponsive() {
    const { toggleMenu, setToggleMenu } = useNavStore()
    const pathname = usePathname()
    const panelRef = useRef<HTMLDivElement>(null)

    // Portal target only exists in the browser
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // Close after navigating to another page
    useEffect(() => {
        setToggleMenu(false)
    }, [pathname, setToggleMenu])

    // Close if the screen grows to desktop size (otherwise the scroll lock could stick)
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)")
        const onChange = () => mq.matches && setToggleMenu(false)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [setToggleMenu])

    // While open: lock scroll, handle Escape, trap Tab, return focus on close
    useEffect(() => {
        if (!toggleMenu) return

        const opener = document.activeElement as HTMLElement | null
        document.body.style.overflow = "hidden"
        panelRef.current?.focus()

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setToggleMenu(false)
                return
            }
            if (e.key !== "Tab" || !panelRef.current) return

            const items = panelRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled])'
            )
            if (!items.length) return
            const first = items[0]
            const last = items[items.length - 1]
            const active = document.activeElement

            if (e.shiftKey && (active === first || active === panelRef.current)) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && active === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = ""
            opener?.focus?.()
        }
    }, [toggleMenu, setToggleMenu])

    const close = () => setToggleMenu(false)

    if (!mounted) return null

    // Portal to <body> so the overlay isn't trapped inside the sticky header's stacking context
    return createPortal(
        <MotionConfig reducedMotion="user">
            <AnimatePresence>
                {toggleMenu && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={close}
                            aria-hidden
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Slide-in panel */}
                        <motion.div
                            key="panel"
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            tabIndex={-1}
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.85 }}
                            className="absolute bottom-4 right-4 top-4 flex w-[85%] max-w-xs flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
                        >
                            {/* Panel header */}
                            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-3">
                                <Logo iconCss="h-14" onClick={close} />
                                <ButtonMenu
                                    color="text-gray-900"
                                    aria-label="Close navigation menu"
                                />
                            </div>

                            {/* Nav list */}
                            <nav aria-label="Main" className="flex-1 overflow-y-auto py-3">
                                <motion.ul
                                    variants={listVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col"
                                >
                                    {NavData.map((i, key) => {
                                        const active = isActive(pathname, i.href)
                                        return (
                                            <motion.li key={`${i.href}-${key}`} variants={itemVariants}>
                                                <Link
                                                    href={i.href}
                                                    onClick={close}
                                                    aria-current={active ? "page" : undefined}
                                                    className={`mx-2 flex items-center rounded-lg px-5 py-3.5 font-medium transition-colors duration-150
                                                        focus-visible:outline-2 focus-visible:outline-cyan-600
                                                        ${active
                                                            ? "bg-cyan-50 font-semibold text-cyan-700"
                                                            : "text-gray-800 hover:bg-gray-50 active:bg-gray-50"
                                                        }`}
                                                >
                                                    {i.name}
                                                </Link>
                                            </motion.li>
                                        )
                                    })}
                                </motion.ul>
                            </nav>

                            {/* Contact footer: fills the space the empty list used to leave */}
                            <div className="shrink-0 space-y-2 border-t border-gray-100 p-4">
                                <Link
                                    href={`tel:${AppInfoData.phone.replace(/[^\d+]/g, "")}`}
                                    onClick={close}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 font-semibold text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                >
                                    <IconDefault type="phone" css="text-white" />
                                    Call us
                                </Link>
                                <Link
                                    href={`mailto:${AppInfoData.email}`}
                                    onClick={close}
                                    className="block truncate text-center text-sm text-gray-600 hover:text-cyan-700"
                                >
                                    {AppInfoData.email}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </MotionConfig>,
        document.body
    )
}