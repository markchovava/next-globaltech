import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { getAuthHeaders } from "../_data/actions/_helpers/getAuthHeaders"
import { _userListAction } from "../_data/actions/UserActions"
import UserAddModal from "./_components/UserAddModal"
import UserPage from "./_components/UserPage"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 3, name: 'Users', href: '/admin/user' },
]


export default async function page() {
  await getAuthHeaders();
  const [userData] = await Promise.all([_userListAction()])
  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />
      {/*  */}
      <UserPage dbData={userData} />

      <UserAddModal />

    </>
  )
}
