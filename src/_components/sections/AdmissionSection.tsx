"use client"

import Heading2 from "../headings/Heading2"
import ContactForm from "../forms/ContactForm"
import CardIcon from "../cards/CardIcon"
import { useAppInfoStore } from "@/_store/useAppInfoStore"
import { useEffect } from "react"
import { motion, Transition } from "motion/react"
import AdmissionForm from "../forms/AdmissionForm"
import { AppInfoData } from "@/_data/sample/AppinfoData"

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



export default function AdmissionSection() {
    const { data, setData } = useAppInfoStore()





    return (
        <section className="w-full">
            <div className="container__primary grid lg:grid-cols-2 grid-cols-1 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={formTransition}
                >
                    <AdmissionForm />
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
                        <Heading2 name={AppInfoData.admission.name} />
                    </motion.div>

                    <div className="border-t border-gray-200 my-4 py-4 space-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-150px" }}
                            transition={paraTransition}
                        >
                            {AppInfoData.admission.list[0]}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-150px" }}
                            transition={paraTransition}
                        >
                            {AppInfoData.admission.list[1]}
                        </motion.p>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}