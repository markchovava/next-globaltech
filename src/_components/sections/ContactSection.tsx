"use client"


import Heading2 from "../headings/Heading2"
import ContactForm from "../forms/ContactForm"
import CardIcon from "../cards/CardIcon"
import { useAppInfoStore } from "@/_store/useAppInfoStore"
import { useEffect } from "react"
import { motion, Transition } from "motion/react"

const formTransition: Transition = {
    duration: 1.1,
    ease: [0.16, 1, 0.3, 1] as const,
}

const panelTransition: Transition = {
    duration: 1.2,
    delay: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
}

const paraTransition: Transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0.16, 1, 0.3, 1] as const,
}

// each contact row (phone/email/address) appears one after another
const rowTransition = (index: number): Transition => ({
    duration: 0.7,
    delay: 0.7 + index * 0.15,
    ease: [0.16, 1, 0.3, 1] as const,
})

interface Props {
    dbData: any
}

export default function ContactSection({ dbData }: Props) {
    const { data, setData } = useAppInfoStore()

    useEffect(() => {
        setData(dbData)
    }, [setData, dbData])

    // build the visible rows so we can index them for staggering
    const rows = [
        data?.phone && { key: "phone", name: data.phone, iconType: "phone" as const },
        data?.email && { key: "email", name: data.email, iconType: "email" as const },
        data?.address && { key: "address", name: data.address, iconType: "address" as const },
    ].filter(Boolean) as { key: string; name: string; iconType: "phone" | "email" | "address" }[]

    return (
        <section className="w-full">
            <div className="container__primary grid lg:grid-cols-2 grid-cols-1 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={formTransition}
                >
                    <ContactForm />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={panelTransition}
                >
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={panelTransition}
                    >
                        <Heading2 name="Our Contact Details" />
                    </motion.div>

                    <div className="border-t border-gray-200 my-4 py-4">
                        <motion.p
                            className="mb-4"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-150px" }}
                            transition={paraTransition}
                        >
                            We value our customers and encourage you to visit us during normal
                            business hours to explore our expert consulting solutions. Our team is
                            dedicated to enhancing your operational efficiency.
                        </motion.p>

                        <div className="font-bold mb-2">Harare</div>
                        {rows.map((row, index) => (
                            <motion.div
                                className="mb-2"
                                key={row.key}
                                initial={{ opacity: 0, x: 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-150px" }}
                                transition={rowTransition(index)}
                                whileHover={{ x: 4 }}
                            >
                                <CardIcon name={row.name} iconType={row.iconType} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}