"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { MontserratRegular } from "@/_assets/fonts/montserrat/_MontserratFont"

interface Props {
    name: string
    href: string
}

export default function NavItem({ name, href }: Props) {
    const pathname = usePathname()

    // In-page anchors ("#about") never count as the active page
    const path = href.startsWith("#") ? null : href.split("#")[0] || "/"
    const active =
        path !== null && (path === "/" ? pathname === "/" : pathname.startsWith(path))

    return (
        <li>
            <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${MontserratRegular.className} group relative block py-2 text-sm font-semibold uppercase tracking-wide
                    transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600
                    ${active ? "text-cyan-700" : "text-gray-900 hover:text-cyan-600"}`}
            >
                {name}

                {/* Hover underline (inactive items) */}
                {!active && (
                    <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-cyan-600/60 transition-transform duration-200 group-hover:scale-x-100"
                    />
                )}

                {/* Active underline: slides between items when the page changes */}
                {active && (
                    <motion.span
                        layoutId="nav-underline"
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-600"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                )}
            </Link>
        </li>
    )
}