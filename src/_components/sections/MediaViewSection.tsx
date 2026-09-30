"use client"
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { MediaImageInterface } from '@/_data/entity/MediaEntity'
import Spacer from '../spacers/Spacer'
import TitleNormal from '../titles/TitleNormal'
import ImagePrimary from '../images/ImagePrimary'
import IconDefault from '../icons/IconDefault'

interface Props {
    title?: string
    subtitle?: string
    description?: string
    images?: MediaImageInterface[] | any[]
}

const gridVariants: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 }
    }
}

const tileVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
}

const slideVariants: Variants = {
    enter: (direction: number) => ({
        opacity: 0,
        scale: 0.97,
        x: direction > 0 ? 40 : -40
    }),
    center: {
        opacity: 1,
        scale: 1,
        x: 0
    },
    exit: (direction: number) => ({
        opacity: 0,
        scale: 0.97,
        x: direction > 0 ? -40 : 40
    })
}

export default function MediaViewSection({
    title,
    subtitle,
    description,
    images = []
}: Props) {
    const [[activeIndex, direction], setActiveState] = useState<[number | null, number]>([null, 0])

    const openLightbox = useCallback((index: number) => {
        setActiveState([index, 0])
    }, [])

    const closeLightbox = useCallback(() => {
        setActiveState(([prev]) => [null, 0])
    }, [])

    const showPrev = useCallback(() => {
        setActiveState(([prev]) =>
            prev === null ? [null, 0] : [(prev - 1 + images.length) % images.length, -1]
        )
    }, [images.length])

    const showNext = useCallback(() => {
        setActiveState(([prev]) =>
            prev === null ? [null, 0] : [(prev + 1) % images.length, 1]
        )
    }, [images.length])

    useEffect(() => {
        if (activeIndex === null) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') showPrev()
            if (e.key === 'ArrowRight') showNext()
        }

        window.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [activeIndex, closeLightbox, showPrev, showNext])

    return (
        <section>
            <Spacer />
            <section className="container__primary">
                <TitleNormal
                    name={title}
                    title={subtitle} />
                <div className="text-lg my-6">
                    {description}
                </div>
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8"
                >
                    {images.length > 0 && images[0].image &&
                        <motion.div
                            variants={tileVariants}
                            onClick={() => openLightbox(0)}
                            whileHover="hover"
                            className="lg:col-span-2 lg:row-span-2 col-span-1 lg:h-auto h-60 cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)' }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full bg-gray-200 drop-shadow rounded-xl overflow-hidden"
                            >
                                <motion.div
                                    variants={{ hover: { scale: 1.05 } }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full"
                                >
                                    <ImagePrimary image={images[0].image} text={`Image ${images[0].id}`} />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    }
                    {images.slice(1).map((i, key) => (
                        <motion.div
                            key={key}
                            variants={tileVariants}
                            onClick={() => openLightbox(key + 1)}
                            whileHover="hover"
                            className="w-full h-60 bg-gray-200 drop-shadow rounded-xl overflow-hidden cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)' }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <motion.div
                                    variants={{ hover: { scale: 1.05 } }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full"
                                >
                                    <ImagePrimary
                                        image={i.image}
                                        text={`Image ${i.id}`} />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            <Spacer />

            <MediaLightBox
                images={images}
                activeIndex={activeIndex}
                direction={direction}
                onClose={closeLightbox}
                onPrev={showPrev}
                onNext={showNext}
            />
        </section>
    )
}

interface MediaLightBoxProps {
    images: MediaImageInterface[] | any[]
    activeIndex: number | null
    direction: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

function MediaLightBox({
    images,
    activeIndex,
    direction,
    onClose,
    onPrev,
    onNext
}: MediaLightBoxProps) {
    return (
        <AnimatePresence>
            {activeIndex !== null && images[activeIndex] && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={onClose}
                >
                    {/* Close button */}
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                        aria-label="Close"
                    >
                        <IconDefault type='close' css='text-xl' />
                    </motion.button>

                    {/* Prev button */}
                    {images.length > 1 && (
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onPrev() }}
                            whileHover={{ scale: 1.25, x: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            aria-label="Previous image"
                        >
                            <IconDefault type='left' css='text-xl' />
                        </motion.button>
                    )}

                    {/* Image */}
                    <div
                        className="relative flex items-center justify-center h-full w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.img
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                src={images[activeIndex].image?.url ?? images[activeIndex].image}
                                alt={`Image ${images[activeIndex].id}`}
                                className="h-[70vh] md:h-[80vh] w-auto max-w-[92vw] object-contain rounded-lg"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Next button */}
                    {images.length > 1 && (
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onNext() }}
                            whileHover={{ scale: 1.25, x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            aria-label="Next image"
                        >
                            <IconDefault type='right' css='text-xl' />
                        </motion.button>
                    )}

                    {/* Counter */}
                    {images.length > 1 && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`counter-${activeIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm"
                            >
                                {activeIndex + 1} / {images.length}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}