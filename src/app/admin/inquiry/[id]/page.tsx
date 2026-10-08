import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _inquiryViewAction } from "../../_data/actions/InquiryActions";
import { _serviceAllAction } from "../../_data/actions/ServiceActions";
import InquiryEditModal from "./_components/InquiryEditPage";
import InquiryViewPage from "./_components/InquiryViewPage";



const title = 'View Inquiry'


interface PropInterface {
  params: Promise<{
    id: string
  }>
}


export default async function page({ params }: PropInterface) {
  const { id } = await params;
  const [inquiryData, servicesData] = await Promise.all([
    _inquiryViewAction(id),
    _serviceAllAction()
  ])

  const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 3, name: 'Inquiries', href: '/admin/inquiry' },
    { id: 4, name: title, href: `/admin/inquiry/${id}` },
  ]

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />
      {/*  */}
      <InquiryViewPage dbData={inquiryData} id={id} />

      <InquiryEditModal id={id} servicesData={servicesData} />

    </>
  )
}
