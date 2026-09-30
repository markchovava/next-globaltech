"use client"
import Heading1 from '../headings/Heading1'
import { motion, Transition } from "motion/react"
import TitleSmall from '../titles/TitleSmall'
import { ReactNode } from 'react'



interface Props {
    title: string
    subtitle: string
    details: ReactNode
}

const smoothTransition = (delay: number): Transition => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // gentle ease-out, no snap at the end
})

export default function AboutSection({
    title,
    subtitle,
    details
}: Props) {
    return (
        <>
            <section>
                <div className='mx-auto lg:w-[60%] w-[80%] bg-white rounded-xl py-12 px-9 drop-shadow-lg space-y-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={smoothTransition(0.25)}>
                        <TitleSmall name={subtitle} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={smoothTransition(0.5)}>
                        <Heading1 name={title} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={smoothTransition(0.75)}>
                        <p className="text-xl">
                            {details}
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
