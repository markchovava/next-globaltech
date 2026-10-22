import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { getAuthHeaders } from "../_data/actions/_helpers/getAuthHeaders"
import { _messageListAction } from "../_data/actions/MessageActions"
import MessageAddModal from "./_components/MessageAddModal"
import MessagePage from "./_components/MessagePage"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 3, name: 'Messages', href: '/admin/message' },
]


export default async function page() {
  await getAuthHeaders();
  const [messageData] = await Promise.all([_messageListAction()])
  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <MessagePage dbData={messageData} />

      {/* MODAL */}
      <MessageAddModal />

    </>
  )
}
