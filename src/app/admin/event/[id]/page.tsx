import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _eventViewAction } from "../../_data/actions/EventActions";
import EventEditModal from "./_components/EventEditPage";
import EventViewPage from "./_components/EventViewPage";


const title = 'View Event'

interface Props {
  params: Promise<{
    id: string
  }>
}


export default async function page({ params }: Props) {
  const { id } = await params;
  const [eventData] = await Promise.all([_eventViewAction(id)])

  const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 3, name: 'Events', href: '/admin/event' },
    { id: 4, name: title, href: `/admin/event/${id}` },
  ]

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <EventViewPage dbData={eventData} />

      {/* MODAL */}
      <EventEditModal id={id} />

    </>
  )
}
