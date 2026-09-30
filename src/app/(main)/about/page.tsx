import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import Header2 from '@/_components/headers/Header2'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import ContactSection from '@/_components/sections/ContactSection'
import SectionDualText from '@/_components/sections/SectionDualText'
import SectionPrimary from '@/_components/sections/SectionPrimary'
import SectionPrimaryDark from '@/_components/sections/SectionPrimaryDark'
import SectionTrioText from '@/_components/sections/SectionTrioText'
import ValuesSection from '@/_components/sections/ValuesSection'
import Spacer from '@/_components/spacers/Spacer'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { appInfoViewAction } from '@/app/admin/_data/actions/AppInfoActions'
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
                    withContact={true}
                />
            </div>

            <div id='mission'>
                <SectionPrimary
                    dir='right'
                    image="/assets/images/gallery/08.jpg"
                    title={AppInfoData.mission.name}
                    subtitle="Our Mission"
                    withContact={true}
                    details={AppInfoData.mission.details}
                />
            </div>

            <div id='vision'>
                <SectionPrimaryDark
                    dir='left'
                    image="/assets/images/gallery/03.jpg"
                    title={AppInfoData.vision.name}
                    subtitle="Our Vision"
                    withContact={false}
                    details={AppInfoData.vision.details}
                />
            </div>

            <div id='values'>
                <Spacer />
                <ValuesSection
                    title='Our Values'
                    subtitle={title}
                    values={AppInfoData.values.list} />
            </div>


            <section className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
