"use client"

import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import { motion, Transition } from "motion/react"
import Button from "../buttons/Button"
import MediaCard from "../cards/MediaCard"
import { ServiceInterface } from "@/_data/entity/ServiceEntity"
import ServiceCard from "../cards/ServiceCard"





const smoothTransition = (delay: number): Transition => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // gentle ease-out, no snap at the end
})


interface Props {
    list: ServiceInterface[] | any[]
    title: string
    subtitle?: string
    withBtn?: boolean

}

const STAGGER_STEP = 0.1 // seconds between each card's entrance

export default function ServiceSection({
    list,
    title,
    subtitle,
    withBtn = false
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
                                <ServiceCard
                                    key={key}
                                    image={i.image}
                                    data={i} />
                            </motion.div>
                        ))}
                    </div>
                    {withBtn &&
                        <div className="flex items-center justify-center pt-6">
                            <Button
                                name="View More"
                                css="text-lg py-4 px-11 text-white"
                            />
                        </div>
                    }
                </div>
                <Spacer />
            </section>
        </>
    )
}
