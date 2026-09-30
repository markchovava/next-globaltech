"use client"
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '../../_components/headings/HeadingDefault'
import RecordDefault from '../../_components/records/RecordDefault'
import ButtonAdmin from '../../_components/buttons/ButtonAdmin'
import { useProfileStore } from '../../_data/store/useProfileStore'
import ButtonAdminSecondary from '../../_components/buttons/ButtonAdminSecondary'
import { useEffect } from 'react'
import LoaderPrimary from '../../_components/loaders/LoaderPrimary'


const title = "Profile"


interface PropInterface {
  dbData: any
}

export default function ProfilePage({ dbData }: PropInterface) {
  const {
    data,
    preData,
    setData,
    setToggleModal,
    setTogglePasswordModal
  } = useProfileStore()

  useEffect(() => {
    if (dbData.data) {
      setData(dbData.data)
    }
  }, [])

  const handleToggleModal = () => {
    setToggleModal(true)
  }

  const handleTogglePasswordModal = () => {
    setTogglePasswordModal(true)
  }

  return (
    <>
      <SpacerDefault />
      <HeadingDefault title={title} />
      <SpacerPrimary />

      <section className='container__primary flex items-center justify-end gap-2'>
        <ButtonAdminSecondary
          type='button'
          name='Password'
          onClick={handleTogglePasswordModal}
          css='py-2 px-6' />
        <ButtonAdmin
          type='button'
          name='Edit'
          onClick={handleToggleModal}
          css='py-2 px-6' />
      </section>

      <MainDataArea />

      <SpacerDefault />
    </>
  )
}


function MainDataArea() {
  const {
    preData,
    isLoading
  } = useProfileStore()

  if (isLoading) {
    return (
      <LoaderPrimary />
    )
  }

  return (
    <section className='container__primary bg-white drop-shadow-lg rounded-lg p-6 space-y-4'>
      <RecordDefault label='Name' value={preData?.name ?? 'Not Added yet.'} />
      <RecordDefault label='Email' value={preData?.email ?? 'Not Added yet.'} />
      <RecordDefault label='Code' value={preData?.code ?? 'Not Added yet.'} />
      <RecordDefault label='Address' value={preData?.address ?? 'Not Added yet.'} />
      <RecordDefault label='Phone Number' value={preData?.phone ?? 'Not Added yet.'} />
      <RecordDefault label='Role Level' value={preData?.roleLevel ?? 'Not Added yet.'} />
      <RecordDefault label='Admin' value={preData?.isAdmin ?? 'Not Added yet.'} />
      <SpacerPrimary />
    </section>
  )
}
