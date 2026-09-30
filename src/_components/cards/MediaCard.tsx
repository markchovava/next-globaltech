"use client"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import IconDefault from "../icons/IconDefault"
import Image from "next/image"
import { NoImageData } from "@/_data/sample/NoImage"
import Link from "next/link"


interface Props {
    image?: string
    name?: string | number
    id?: string | number
}


export default function MediaCard({
    id = 1,
    name,
    image = NoImageData
}: Props) {

    const safeImage = typeof image === "string" && image.trim().length > 0
        ? image
        : NoImageData;

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    // smooth out raw pointer movement
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig)
    const imgX = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig)
    const imgY = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), springConfig)
    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    function handlePointerLeave() {
        x.set(0)
        y.set(0)
    }




    return (
        <motion.div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ perspective: 800 }}
            initial="initial"
            whileHover="hover"
            animate="initial"
            className="md:h-120 h-100 drop-shadow-md relative group cursor-pointer rounded-xl overflow-hidden"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="bg-gray-400 w-full absolute h-full z-10"
            >
                {/* entrance zoom + image parallax drift on hover */}
                <motion.div
                    style={{ x: imgX, y: imgY, scale: 1.15 }}
                    initial={{ opacity: 0, scale: 1.3 }}
                    whileInView={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                >
                    <motion.div
                        variants={{ initial: { scale: 1 }, hover: { scale: 1.08 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <Image
                            alt="Image"
                            src={safeImage}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>

                {/* diagonal light sweep */}
                <motion.div
                    variants={{
                        initial: { x: "-120%", opacity: 0 },
                        hover: { x: "120%", opacity: 1 },
                    }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute inset-0 z-10 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none"
                />
            </motion.div>

            <div className="absolute z-12 h-[50%] w-full bottom-0 left-0 bg-linear-to-t from-black/50 to-transparent" />

            <Link href={`/media/${id}`}>
                <PointerButton />
            </Link>

            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: -4 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute z-20 bottom-0 left-0 w-full py-6 px-5 text-white" >
                <Link href={`/media/${id}`}>
                    <h4 className="text-xl hover:underline hover:text-amber-200 transition__effect">
                        {name}
                    </h4>
                </Link>
            </motion.div>
        </motion.div>
    )
}

function PointerButton() {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className="absolute cursor-pointer flex items-center justify-center z-15
                    top-[5%] right-[5%] h-12 w-12 rounded-full
                    bg-amber-900 hover:bg-amber-950 overflow-hidden"
        >
            <motion.span
                className="inline-block"
                variants={{
                    initial: { rotate: -45 },
                    hover: { rotate: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <IconDefault type="right-long" css="text-white" />
            </motion.span>
        </motion.div>
    )
}