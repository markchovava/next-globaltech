import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { _eventAllAction } from "../_data/actions/EventActions"
import { _galleryListAction } from "../_data/actions/GalleryActions"
import GalleryAddModal from "./_components/GalleryAddModal"
import GalleryPage from "./_components/GalleryPage"



const title = "Galleries"

const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 2, name: title, href: '/admin/gallery' },
]


export default async function page() {
  const [galleriesData, eventsData] = await Promise.all([
    _galleryListAction(),
    _eventAllAction(),
  ])

  return (
    <>

      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <GalleryPage title={title} dbData={galleriesData} />

      {/* MODAL */}
      <GalleryAddModal title={title} eventsData={eventsData} />

    </>
  )
}
