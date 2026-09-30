import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import Header2 from "@/_components/headers/Header2"
import ContactSection from "@/_components/sections/ContactSection"
import SectionGrid from "@/_components/sections/SectionGrid"
import Spacer from "@/_components/spacers/Spacer"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { OffersData } from "@/_data/sample/OffersData"


const title = "What We Do"

const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'What We Do?', href: '/what-we-do' },
]

export default async function Page() {
    /* const [appData,] = await Promise.all([
        appInfoViewAction()
    ]) */
    return (
        <>

            <Header2 name={title} image={AppInfoData.headers[0]} />
            <BreadCrumb data={CrumbsData} />

            <SectionGrid
                list={OffersData}
                title="What We Do"
                subtitle='Our Offering' />

            <section className="bg-gray-50">
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
