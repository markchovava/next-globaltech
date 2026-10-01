"use client"

import { motion, type Variants } from "motion/react"
import { ManagementInterface } from "@/_data/entity/ManagementEntity"
import TitleNormal from "../titles/TitleNormal"
import ManagementCard from "../cards/ManagementCard"

interface Props {
    title: string
    subtitle: string
    data: ManagementInterface[] | any[]
}

// One orchestrated moment: the grid staggers its cards in once, when scrolled into view.
const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function ManagementSection({ title, subtitle, data }: Props) {
    return (
        <section>
            <div className="container__primary space-y-10">
                <TitleNormal name={title} title={subtitle} />

                <motion.div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {data && data.length > 0 && data.map((i, key) => (
                        <ManagementCard
                            key={key} data={i}
                            image={i.image} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}