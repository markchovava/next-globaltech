import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import Header2 from "@/_components/headers/Header2"
import ContactSection from "@/_components/sections/ContactSection"
import EventSection from "@/_components/sections/EventSection"
import MediaSection from "@/_components/sections/MediaSection"
import Spacer from "@/_components/spacers/Spacer"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { MediaData } from "@/_data/sample/MediaData"
import { OffersData } from "@/_data/sample/OffersData"


const title = "Our Media"

const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/media' },
]

export default async function Page() {
    /* const [appData,] = await Promise.all([
        appInfoViewAction()
    ]) */
    return (
        <>

            <Header2 name={title} image={AppInfoData.headers[0]} />
            <BreadCrumb data={CrumbsData} />

            <div className="bg-gray-50">
                <EventSection title="Upcoming Events" subtitle="Our Media" />
            </div>

            <MediaSection
                list={MediaData}
                title="Recent Events"
                subtitle='Our Media' />

            <section className="bg-gray-50">
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
