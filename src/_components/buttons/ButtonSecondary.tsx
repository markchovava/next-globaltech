"use client"
import IconDefault from '@/_components/icons/IconDefault'
import { motion } from 'motion/react'
import { useState } from 'react'

interface PropInterface {
    name: string
    status?: boolean
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    css?: string
}

export default function ButtonSecondary({
    name,
    type = 'button',
    onClick,
    status,
    css = 'py-3 px-8'
}: PropInterface) {
    const [onHover, setHover] = useState<boolean>(false)

    return (
        <motion.button
            onClick={onClick}
            type={type}
            disabled={status}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            whileTap={{ scale: 0.9 }}
            animate={{ opacity: status ? 0.5 : 1 }}
            className={`${css} group relative flex items-center justify-center gap-1 cursor-pointer
            bg__secondary rounded-full overflow-hidden disabled:cursor-not-allowed`}>
            {/* The Text: Uses motion.span for spring movement */}
            <motion.span
                initial={false}
                animate={{ x: onHover ? -4 : 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative z-10 font-normal text-white text-base"
            >
                {name}
            </motion.span>

            {/* The Icon: Uses motion.span for opacity, translation, and scale spring animation */}
            <motion.span
                initial={false}
                animate={{
                    opacity: onHover ? 1 : 0,
                    x: onHover ? 0 : -16,
                    scale: onHover ? 1 : 0.6
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="relative z-10 flex items-center"
            >
                <IconDefault type="right" css="text-white" />
            </motion.span>
        </motion.button>
    )
}