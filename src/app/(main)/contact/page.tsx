import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import HeaderSecondary from "@/_components/headers/HeaderSecondary"
import AddressMap from "@/_components/maps/AddressMap"
import ContactSection from "@/_components/sections/ContactSection"
import Spacer from "@/_components/spacers/Spacer"
import TitleNormal from "@/_components/titles/TitleNormal"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import { Metadata } from "next"




export const metadata: Metadata = {
    title: 'Contact Us | Own One Vehicles | Harare CBD Office',
    description: `Get in touch with Own One Vehicles today. Visit our office 
        in the Harare CBD, call us, or send an inquiry to start sourcing your 
        next vehicle with our expert team.
    `,
    keywords: [
        'contact Own One Vehicles',
        'car importer phone number Harare',
        'buy car office Harare CBD',
        'vehicle import inquiry Zimbabwe',
        'customer support Own One Vehicles'
    ],
    openGraph: {
        images: ['/assets/images/logos/logo.png'],
        title: 'Contact Us | Own One Vehicles | Harare CBD Office',
        description: `Get in touch with Own One Vehicles today. Visit our office 
            in the Harare CBD, call us, or send an inquiry to start sourcing your 
            next vehicle with our expert team.
        `,
    },
};



const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Contact Us', href: '/contact' },
]

export default async function page() {
    /* const [appData] = await Promise.all([appInfoViewAction()]) */
    return (
        <>

            <HeaderSecondary name='Contact Us' image={AppInfoData.headers[4]} />
            <BreadCrumb data={CrumbsData} />

            <Spacer />
            <div className="container__primary space-y-6">
                <TitleNormal name="Contact Us" />
                <ContactSection dbData={AppInfoData} />
            </div>

            <Spacer />

            <section className="w-screen h-70">
                <AddressMap />
            </section>

        </>
    )
}
