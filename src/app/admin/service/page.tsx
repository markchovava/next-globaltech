import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import ServiceAddModal from "./_components/ServiceAddModal"
import ServicePage from "./_components/ServicePage"
import { _serviceListAction } from "../_data/actions/ServiceActions"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 2, name: 'Services', href: '/admin/service' },
]


export default async function page() {
  const [serviceData] = await Promise.all([_serviceListAction()])

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <ServicePage dbData={serviceData} />

      {/* MODAL */}
      <ServiceAddModal />

    </>
  )
}
