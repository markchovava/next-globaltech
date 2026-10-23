import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import HeaderSecondary from '@/_components/headers/HeaderSecondary'
import ContactSection from '@/_components/sections/ContactSection'
import GallerySection from '@/_components/sections/GallerySection'
import Spacer from '@/_components/spacers/Spacer'
import { AppInfoData } from '@/_data/sample/AppinfoData'
import { galleryListAction } from '@/app/admin/_data/actions/GalleryActions'
import { Metadata } from 'next'


const title = 'Our Gallery'

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
    { id: 2, name: title, href: '/gallery' },
]


export default async function page() {
    const [galleryData] = await Promise.all([
        galleryListAction()
    ])




    return (
        <>
            <HeaderSecondary name={title} image={AppInfoData.headers[2]} />
            <BreadCrumb data={CrumbsData} />

            <GallerySection
                list={galleryData}
                title="What's happening?"
                subtitle={title} />


            <section className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={AppInfoData} />
                <Spacer />
            </section>
        </>
    )
}
