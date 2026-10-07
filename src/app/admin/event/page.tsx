import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { _eventListAction } from "../_data/actions/EventActions"
import EventAddModal from "./_components/EventAddModal"
import EventPage from "./_components/EventPage"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 2, name: 'Events', href: '/admin/event' },
]


export default async function page() {
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
