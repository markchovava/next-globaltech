import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import SettingsPage from "./_components/SettingsPage"





const CrumbsData = [
    {id: 1, name: 'Admin', href: '/admin'},
    {id: 1, name: 'Settings', href: '/admin/settings'},
]


export default function page() {
  return (
    <>
        <BreadCrumbDefault data={CrumbsData} />
        {/*  */}
        <SettingsPage />

    </>
  )
}
