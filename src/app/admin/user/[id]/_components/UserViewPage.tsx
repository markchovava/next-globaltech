"use client"
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import { useUserStore } from '../../../_data/store/useUserStore'
import HeadingDefault from '@/app/admin/_components/headings/HeadingDefault'
import ButtonAdmin from '@/app/admin/_components/buttons/ButtonAdmin'
import RecordDefault from '@/app/admin/_components/records/RecordDefault'
import { useEffect } from 'react'
import { valueWithFallback } from '@/_utils/StringManipulation'
import { formatDate } from '@/_utils/formatDate'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'



const title = "View User"

interface Props {
  id: string | number
  dbData: any
}

export default function UserViewPage({ id, dbData }: Props) {
  const {
    setData,
    toggleModal,
    setToggleModal,
  } = useUserStore()

  useEffect(() => {
    setData(dbData.data)
  }, [dbData.data, setData])

  const handleToggleModal = () => {
    setToggleModal(!toggleModal)
  }


  return (
    <>
      <SpacerDefault />
      <HeadingDefault title={title} />
      <SpacerPrimary />

      <section className='container__primary flex items-center justify-end'>
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
    isLoading,
  } = useUserStore()


  const updatedAt = preData?.updatedAt ? formatDate(preData?.updatedAt) : ""



  if (isLoading) {
    return (
      <LoaderPrimary />
    )
  }

  return (
    <section className='container__primary bg-white drop-shadow-lg rounded-lg p-6 space-y-4'>
      <RecordDefault label='Name' value={valueWithFallback(preData?.name)} />
      <RecordDefault label='Email' value={valueWithFallback(preData?.email)} />
      <RecordDefault label='Phone Number' value={valueWithFallback(preData?.phone)} />
      <RecordDefault label='Address' value={valueWithFallback(preData?.address)} />
      <RecordDefault label='Admin' value={valueWithFallback(preData?.isAdmin.toString())} />
      <RecordDefault label='Code' value={valueWithFallback(preData?.code)} />
      <RecordDefault label='Role Level' value={valueWithFallback(preData?.roleLevel)} />
      <RecordDefault label='Created' value={valueWithFallback(updatedAt)} />
      <SpacerPrimary />
    </section>
  )
}

