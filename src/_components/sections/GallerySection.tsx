"use client"

import { useEffect, useMemo, useState } from "react"
import CardOne from "../cards/CardOne"
import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import { motion, Transition } from "motion/react"
import { OfferInterface } from "@/_data/entity/OfferEntity"
import ImageLightbox from "@/app/admin/_components/lightbox/ImageLightbox"
import { GalleryInterface } from "@/_data/entity/GalleryEntity"
import GalleryCard from "../cards/GalleryCard"
import { useGalleryStore } from "@/_store/useGalleryStore"
import PaginateDefault from "@/app/admin/_components/paginations/PaginateDefault"
import { baseURL } from "@/_api/baseURL"
// import { baseURL } from "@/_api/baseURL" // uncomment if your image paths are relative


const smoothTransition = (delay: number): Transition => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // gentle ease-out, no snap at the end
})


interface Props {
    list: any
    title: string
    subtitle?: string
}

const STAGGER_STEP = 0.1 // seconds between each card's entrance

export default function GallerySection({
    list,
    title,
    subtitle
}: Props) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const {
        toggleModal,
        datalist,
        meta,
        links,
        setToggleModal,
        getPaginatedDatalist,
        setDatalist
    } = useGalleryStore()

    useEffect(() => {
        if (list) setDatalist(list)
    }, [list, setDatalist])

    async function handlePaginate(url: string) {
        await getPaginatedDatalist(url)
    }

    // Map your items to what the lightbox needs.
    // Adjust the field names (image / name) to match your data shape.
    const lightboxImages = useMemo(
        () =>
            (datalist ?? []).map((i) => ({
                src: baseURL + i.image,
                caption: i.event?.name,
            })),
        [datalist]
    )

    return (
        <>
            <section className="w-full">
                <Spacer />
                <div className="container__primary space-y-6">
                    <TitleNormal name={title} title={subtitle} />

                    <div className={`w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}>
                        {datalist && datalist.length > 0 && datalist.map((i, index) => (
                            <motion.div
                                key={i.id}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${i?.event?.name ?? "image"}`}
                                className="cursor-pointer"
                                onClick={() => setLightboxIndex(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        setLightboxIndex(index)
                                    }
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={smoothTransition(index * STAGGER_STEP)}
                            >
                                <GalleryCard data={i} />
                            </motion.div>
                        ))}
                    </div>
                </div>
                <Spacer />
                <section className='container__primary flex items-center justify-end gap-3'>
                    <PaginateDefault
                        meta={meta}
                        links={links}
                        handlePaginate={handlePaginate} />
                </section>
                <Spacer />
            </section>

            <ImageLightbox
                images={lightboxImages}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
            />
        </>
    )
}