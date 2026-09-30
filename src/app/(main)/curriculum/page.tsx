import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'

import ContactSection from '@/_components/sections/ContactSection'
import SectionDualText from '@/_components/sections/SectionDualText'
import SectionOne from '@/_components/sections/SectionOne'
import SectionOneDark from '@/_components/sections/SectionOneDark'
import SectionPrimary from '@/_components/sections/SectionPrimary'
import SectionTrioText from '@/_components/sections/SectionTrioText'
import SubjectSection from '@/_components/sections/SubjectSection'
import Spacer from '@/_components/spacers/Spacer'
import TitleNormal from '@/_components/titles/TitleNormal'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { SubjectsData } from '@/_data/sample/SubjectsData'
import { appInfoViewAction } from '@/app/admin/_data/actions/AppInfoActions'
import { Metadata } from 'next'



const title = "Our Curriculum"


export const metadata: Metadata = {
    title: `${title} | ${AppInfoData.name}`,
    description: `${title} | ${AppInfoData.name}`,
    keywords: [
        'about Own One Vehicles',
        'reliable car importers Harare',
        'trusted vehicle sourcing Zimbabwe',
        'Harare car import agency',
        'clear car imports Zimbabwe',
        'automotive import experts'
    ],
    openGraph: {
        images: ['/assets/images/logos/logo.png'],
        title: `${title} | ${AppInfoData.name}`,
        description: `${title} | ${AppInfoData.name}`,
    },
};


const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: title, href: '/curriculum' },
]

export default async function page() {
    /*  const [appData] = await Promise.all([
         appInfoViewAction()
     ]) */

    return (
        <>

            <BreadCrumb data={CrumbsData} />


            <div className='about'>
                <SectionPrimary
                    dir='left'
                    image="/assets/images/gallery/03.jpg"
                    title={AppInfoData.curriculum.name}
                    subtitle={title}
                    details={AppInfoData.curriculum.details}
                    withContact={true}
                />
            </div>

            {/* data */}
            <div className='bg-white'>
                <SubjectSection
                    title="Our Subjects"
                    subtitle="Explore our comprehensive curriculum"
                    data={SubjectsData} />
            </div>

            {/*  <Spacer />
            <SectionDualText data={AppInfoData.important} /> */}


            <section className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
