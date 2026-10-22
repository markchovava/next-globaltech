import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { getAuthHeaders } from "../_data/actions/_helpers/getAuthHeaders"
import { _eventListAction } from "../_data/actions/EventActions"
import EventAddModal from "./_components/EventAddModal"
import EventPage from "./_components/EventPage"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 2, name: 'Events', href: '/admin/event' },
]


export default async function page() {
  await getAuthHeaders();
  const [eventData] = await Promise.all([_eventListAction()])

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <EventPage dbData={eventData} />

      {/* MODAL */}
      <EventAddModal />

    </>
  )
}
