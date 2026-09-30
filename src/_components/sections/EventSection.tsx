"use client"

import { EventsData } from "@/_data/sample/EventData"
import Spacer from "../spacers/Spacer"
import TitleNormal from "../titles/TitleNormal"
import EventCarousel from "../carousels/EventCarousel"
import { AppInfoData } from "@/_data/sample/AppinfoData"


interface Props {
    list?: any[]
    title?: string
    subtitle?: string
}

export default function EventSection({
    title = 'The title',
    subtitle = 'The subtitle',
    list = [],
}: Props) {


    return (
        <>
            <section className="w-full">
                <Spacer />
                <div className="container__primary">
                    <div className="mb-6">
                        <TitleNormal
                            name={title}
                            title={subtitle}
                        />
                    </div>
                    <div className="text-lg my-6">
                        For more information contact us on {AppInfoData.phone}
                    </div>
                    <EventCarousel
                        data={EventsData}
                    />
                </div>
                <Spacer />
            </section>
        </>
    )
}
