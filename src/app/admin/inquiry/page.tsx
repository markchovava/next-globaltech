import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { _inquiryListAction } from "../_data/actions/InquiryActions"
import { _serviceAllAction } from "../_data/actions/ServiceActions"
import InquiryAddModal from "./_components/InquiryAddModal"
import InquiryPage from "./_components/InquiryPage"


const title = 'Inquiries'

const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 3, name: title, href: '/admin/inquiry' },
]


export default async function page() {
  const [inquiryData, servicesData] = await Promise.all([_inquiryListAction(),
  _serviceAllAction()])
  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <InquiryPage dbData={inquiryData} title={title} />

      {/* MODAL */}
      <InquiryAddModal servicesData={servicesData} />

    </>
  )
}
