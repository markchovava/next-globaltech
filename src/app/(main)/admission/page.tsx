import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"

import AddressMap from "@/_components/maps/AddressMap"
import AdmissionSection from "@/_components/sections/AdmissionSection"
import ContactSection from "@/_components/sections/ContactSection"
import Spacer from "@/_components/spacers/Spacer"
import TitleNormal from "@/_components/titles/TitleNormal"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { Metadata } from "next"


const title = `Our Admissions`

export const metadata: Metadata = {
    title: `${title} | ${AppInfoData.name}`,
    description: `${title} | ${AppInfoData.name}`,
    keywords: [`${title} | ${AppInfoData.name}`
    ],
    openGraph: {
        images: ['/assets/images/logos/logo.png'],
        title: `${title} | ${AppInfoData.name}`,
        description: `${title} | ${AppInfoData.name}`,
    },
};



const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/contact' },
]

export default async function page() {
    /* const [appData] = await Promise.all([appInfoViewAction()]) */
    return (
        <>

            <BreadCrumb data={CrumbsData} />

            <Spacer />
            <div className="container__primary space-y-6">
                <TitleNormal name={title} />
                <AdmissionSection />
            </div>

            <Spacer />


        </>
    )
}
