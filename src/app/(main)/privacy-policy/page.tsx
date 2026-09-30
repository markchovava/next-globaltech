import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import Heading1 from '@/_components/headings/Heading1'
import ComingSoonSection from '@/_components/sections/ComingSoonSection'
import Spacer from '@/_components/spacers/Spacer'

const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Privacy Policy', href: '/privacy-policy' },
]


export default function page() {
    return (
        <div>
            <BreadCrumb data={CrumbsData} />
            <Spacer />
            <div className="container__primary mb-12 pb-4 border-b border-gray-300">
                <Heading1 name="Privacy Policy" />
            </div>
            <ComingSoonSection />
        </div>
    )
}
