import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import ContactSection from '@/_components/sections/ContactSection'
import ServiceSection from '@/_components/sections/ServiceSection'
import Spacer from '@/_components/spacers/Spacer'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { ServiceData } from '@/_data/sample/ServiceData'


const title = 'Our Services'

const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/service' },
]


export default function page() {
    return (
        <>
            <HeaderSecondary name={title} image={AppInfoData.headers[2]} />
            <BreadCrumb data={CrumbsData} />

            <ServiceSection
                list={ServiceData}
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
