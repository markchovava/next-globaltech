import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import ContactSection from "@/_components/sections/ContactSection"
import MediaViewSection from "@/_components/sections/MediaViewSection"
import Spacer from "@/_components/spacers/Spacer"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { MediaData } from "@/_data/sample/MediaData"


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
