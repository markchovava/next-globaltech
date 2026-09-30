"use client"

import CardOne from "../cards/CardOne"
import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import { motion, Transition } from "motion/react"
import { OfferInterface } from "@/_data/entity/OfferEntity"





const smoothTransition = (delay: number): Transition => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // gentle ease-out, no snap at the end
})


interface Props {
    list: OfferInterface[] | any[]
    title: string
    subtitle?: string

}

const STAGGER_STEP = 0.1 // seconds between each card's entrance

export default function SectionGrid({
    list,
    title,
    subtitle
}: Props) {


    return (
        <>
            <section className="w-full">
                <Spacer />
                <div className="container__primary space-y-6">
                    <TitleNormal name={title} title={subtitle} />

                    <div className={`w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}>
                        {list && list.length > 0 && list.map((i, key) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={smoothTransition(key * STAGGER_STEP)} >
                                <CardOne
                                    key={key}
                                    data={i} />
                            </motion.div>
                        ))}
                    </div>
                    {/*  <div className="flex items-center justify-center pt-4">
                        <Button
                            name="View More"
                            css="text-lg py-4 px-11 text-white"
                        />
                    </div> */}
                </div>
                <Spacer />
            </section>
        </>
    )
}
