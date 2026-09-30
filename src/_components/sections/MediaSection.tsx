"use client"

import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import { motion, Transition } from "motion/react"
import Button from "../buttons/Button"
import MediaCard from "../cards/MediaCard"
import { MediaInterface } from "@/_data/entity/MediaEntity"





const smoothTransition = (delay: number): Transition => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // gentle ease-out, no snap at the end
})


interface Props {
    list: MediaInterface[] | any[]
    title: string
    subtitle?: string

}

const STAGGER_STEP = 0.1 // seconds between each card's entrance

export default function MediaSection({
    list,
    title,
    subtitle
}: Props) {


    return (
        <>
            <section className="w-full">
                <Spacer />
                <div className="container__primary space-y-6">
                    <TitleNormal
                        name={title}
                        title={subtitle} />

                    <div className={`w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}>
                        {list && list.length > 0 && list.map((i, key) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={smoothTransition(key * STAGGER_STEP)} >
                                <MediaCard
                                    key={key}
                                    image={i.images?.[0]?.image}
                                    name={i.name}
                                    id={i.id ?? 0} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center pt-6">
                        <Button
                            name="Load More"
                            css="text-lg py-4 px-11 text-white"
                        />
                    </div>
                </div>
                <Spacer />
            </section>
        </>
    )
}
