import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _serviceViewAction } from "../../_data/actions/ServiceActions";
import ServiceEditModal from "./_components/ServiceEditPage";
import ServiceViewPage from "./_components/ServiceViewPage";




interface Props {
  params: Promise<{
    id: string
  }>
}


export default async function page({ params }: Props) {
  const { id } = await params;
  const [serviceData] = await Promise.all([_serviceViewAction(id)])

  const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 3, name: 'Services', href: '/admin/service' },
    { id: 4, name: 'View Service', href: `/admin/service/${id}` },
  ]

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <ServiceViewPage dbData={serviceData} />

      {/* MODAL */}
      <ServiceEditModal id={id} />

    </>
  )
}
