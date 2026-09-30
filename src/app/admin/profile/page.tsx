import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import PasswordEditModal from "./_components/PasswordEditModal"
import ProfileEditModal from "./_components/ProfileEditModal"
import ProfilePage from "./_components/ProfilePage"
import { _profileViewAction } from "../_data/actions/ProfileActions"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 3, name: 'Profile', href: '/admin/profile' },
]


export default async function page() {
  const [profileData] = await Promise.all([_profileViewAction()])

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />
      {/*  */}
      <ProfilePage dbData={profileData} />

      <ProfileEditModal />

      <PasswordEditModal />

    </>
  )
}
