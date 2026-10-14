"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import IconDefault from "@/_components/icons/IconDefault"

export interface LightboxImage {
    src: string
    caption?: string
}

interface Props {
    images: LightboxImage[]
    /** index of the open image, or null when closed */
    index: number | null
    onClose: () => void
    onIndexChange: (index: number) => void
}

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
}

export default function ImageLightbox({
    images,
    index,
    onClose,
    onIndexChange,
}: Props) {
    const [direction, setDirection] = useState(0)
    const isOpen = index !== null && images.length > 0
    const total = images.length

    const paginate = useCallback(
        (dir: number) => {
            if (index === null || total === 0) return
            setDirection(dir)
            onIndexChange((index + dir + total) % total)
        },
        [index, total, onIndexChange]
    )

    // keyboard + body scroll lock
    useEffect(() => {
        if (!isOpen) return

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight") paginate(1)
            if (e.key === "ArrowLeft") paginate(-1)
        }

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)

        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener("keydown", onKey)
        }
    }, [isOpen, onClose, paginate])

    const current = index !== null ? images[index] : null

    return (
        <AnimatePresence>
            {isOpen && current && (
                <motion.div
                    key="lightbox"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    {/* close */}
                    <motion.button
                        type="button"
                        aria-label="Close"
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose()
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
                    >
                        ✕
                    </motion.button>

                    {/* previous */}
                    {total > 1 && (
                        <motion.button
                            type="button"
                            aria-label="Previous image"
                            onClick={(e) => {
                                e.stopPropagation()
                                paginate(-1)
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                        >
                            ‹
                        </motion.button>
                    )}

                    {/* next */}
                    {total > 1 && (
                        <motion.button
                            type="button"
                            aria-label="Next image"
                            onClick={(e) => {
                                e.stopPropagation()
                                paginate(1)
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                        >
                            ›
                        </motion.button>
                    )}

                    {/* image */}
                    <div
                        className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-16 md:px-24"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.figure
                                key={index}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -100) paginate(1)
                                    else if (info.offset.x > 100) paginate(-1)
                                }}
                                className="flex max-h-full max-w-full cursor-grab flex-col items-center active:cursor-grabbing"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={current.src}
                                    alt={current.caption ?? "Gallery image"}
                                    draggable={false}
                                    className="max-h-[78vh] max-w-full select-none rounded-xl object-contain shadow-2xl"
                                />
                                {current.caption && (
                                    <figcaption className="mt-4 text-center text-white">
                                        {current.caption}
                                    </figcaption>
                                )}
                            </motion.figure>
                        </AnimatePresence>
                    </div>

                    {/* counter */}
                    {total > 1 && (
                        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                            {(index ?? 0) + 1} / {total}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}