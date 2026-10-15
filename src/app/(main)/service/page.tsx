import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import ContactSection from '@/_components/sections/ContactSection'
import ServiceSection from '@/_components/sections/ServiceSection'
import Spacer from '@/_components/spacers/Spacer'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { ServiceData } from '@/_data/sample/ServiceData'
import { serviceAllAction } from '@/app/admin/_data/actions/ServiceActions'
import { Metadata } from 'next'


const title = 'Our Services'

export const metadata: Metadata = {
    title: title + ' | ' + AppInfoData.name,
    description: title + ' | ' + AppInfoData.name,
    keywords: [],
    openGraph: {
        images: ['/assets/images/logos/logo.png'],
        title: title + ' | ' + AppInfoData.name,
        description: title + ' | ' + AppInfoData.name,
    },
};

const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/service' },
]


export default async function page() {
    const [serviceData] = await Promise.all([
        serviceAllAction()
    ])

    return (
        <>
            <HeaderSecondary name={title} image={AppInfoData.headers[2]} />
            <BreadCrumb data={CrumbsData} />

            <ServiceSection
                list={serviceData?.data}
                title="What we do?"
                subtitle={title} />


            <section className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
