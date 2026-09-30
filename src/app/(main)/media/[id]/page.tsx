import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import Header2 from "@/_components/headers/Header2"
import ContactSection from "@/_components/sections/ContactSection"
import MediaSection from "@/_components/sections/MediaSection"
import MediaViewSection from "@/_components/sections/MediaViewSection"
import Spacer from "@/_components/spacers/Spacer"
import TitleNormal from "@/_components/titles/TitleNormal"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { MediaData } from "@/_data/sample/MediaData"
import { OffersData } from "@/_data/sample/OffersData"


const title = "View Media"





interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const uid = Number(id)
    const data = MediaData.find(a => a.id == uid)
    /* const [appData,] = await Promise.all([
        appInfoViewAction()
    ]) */

    const CrumbsData = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: "Our Media", href: '/media' },
        { id: 3, name: title, href: `/media/${id}` },
    ]

    return (
        <>

            <Header2 name={title} image={AppInfoData.headers[2]} />
            <BreadCrumb data={CrumbsData} />

            <MediaViewSection
                title={data?.name}
                subtitle={title}
                description={data?.description}
                images={data?.images}
            />

            <section className="bg-gray-50">
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
