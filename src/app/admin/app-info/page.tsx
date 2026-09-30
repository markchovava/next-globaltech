import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import AppInfoEditModal from "./_components/AppInfoEditModal"
import AppInfoPage from "./_components/AppInfoPage"
import { _appInfoViewAction } from "../_data/actions/AppInfoActions"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 3, name: 'App Information', href: '/admin/app-info' },
]


export default async function page() {
  const [appData] = await Promise.all([_appInfoViewAction()])
  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />
      {/*  */}
      <AppInfoPage dbData={appData} />

      <AppInfoEditModal />

    </>
  )
}
