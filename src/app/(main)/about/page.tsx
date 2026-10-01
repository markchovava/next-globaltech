import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import ContactSection from '@/_components/sections/ContactSection'
import ManagementSection from '@/_components/sections/ManagementSection'
import SectionPrimary from '@/_components/sections/SectionPrimary'
import SectionPrimaryDark from '@/_components/sections/SectionPrimaryDark'
import ValuesSection from '@/_components/sections/ValuesSection'
import Spacer from '@/_components/spacers/Spacer'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { ManagementData } from '@/_data/sample/ManagementData'
import { Metadata } from 'next'


const title = 'About Us'

export const metadata: Metadata = {
    title: title + ' | ' + AppInfoData.name,
    description: title + ' | ' + AppInfoData.name,
    keywords: [
        title + ' | ' + AppInfoData.name,
    ],
    openGraph: {
        images: ['/assets/images/logos/logo.png'],
        title: title + ' | ' + AppInfoData.name,
        description: title + ' | ' + AppInfoData.name,
    },
};


const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/about' },
]

export default async function page() {
    /*  const [appData] = await Promise.all([
         appInfoViewAction()
     ]) */

    return (
        <>
            <HeaderSecondary name={title} image={AppInfoData.headers[2]} />
            <BreadCrumb data={CrumbsData} />


            <div className='about'>
                <SectionPrimary
                    dir='left'
                    image="/assets/images/gallery/05.jpg"
                    title={AppInfoData.about.name}
                    subtitle="About Us"
                    details={AppInfoData.about.intro}
                />
            </div>

            <div id='mission'>
                <SectionPrimary
                    dir='right'
                    image="/assets/images/gallery/08.jpg"
                    title={AppInfoData?.mission?.name}
                    subtitle="Our Mission"
                    details={AppInfoData?.mission?.details}
                />
            </div>

            <div id='vision'>
                <SectionPrimary
                    dir='left'
                    image="/assets/images/gallery/08.jpg"
                    title={AppInfoData?.vision?.name}
                    subtitle="Our Vision"
                    details={AppInfoData?.vision?.details}
                />
            </div>

            <div id='why-us'>
                <SectionPrimaryDark
                    dir='right'
                    image="/assets/images/gallery/03.jpg"
                    title={AppInfoData?.whyUs?.title}
                    details={AppInfoData?.whyUs?.details}
                    subtitle="Why Us"
                />
            </div>

            <div id='values'>
                <Spacer />
                <ValuesSection
                    title='Our Values'
                    subtitle={title}
                    values={AppInfoData.values.list} />
            </div>

            <div>
                <Spacer />
                <ManagementSection
                    title="Our Leadership"
                    subtitle="Meet Our Team"
                    data={ManagementData} />
                <Spacer />
            </div>


            <section className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
