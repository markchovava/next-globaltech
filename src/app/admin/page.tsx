import { Metadata } from 'next';
import BreadCrumbDefault from './_components/bread-crumbs/BreadCrumbDefault'
import { getAuthHeaders } from './_data/actions/_helpers/getAuthHeaders';
import AdminPage from './AdminPage'



export const metadata: Metadata = {
  title: 'Admin | Bako',
  description: `Admin | Bako `,
};

const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
]


export default async function page() {
  await getAuthHeaders();

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      <AdminPage />
    </>
  )
}
