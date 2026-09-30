"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '@/app/admin/_components/headings/HeadingDefault'
import ButtonAdmin from '@/app/admin/_components/buttons/ButtonAdmin'
import RecordDefault from '@/app/admin/_components/records/RecordDefault'
import RecordImage from '@/app/admin/_components/records/RecordImage'
import { valueWithFallback } from '@/_utils/StringManipulation'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'
import { formatDate } from '@/_utils/formatDate'
import { useEffect } from 'react'
import { useServiceStore } from '@/app/admin/_data/store/useServiceStore'
import StickerOne from '@/app/admin/_components/stickers/StickerOne'
import { baseURL } from '@/_api/baseURL'
import HtmlViewer from '@/app/admin/_components/viewers/HtmlViewer'



const title = "View Service"


interface Props {
  dbData: any
}

export default function ServiceViewPage({ dbData }: Props) {
  const { data, setData, setToggleModal } = useServiceStore()

  useEffect(() => {
    // Call setData even if dbData.data is null 
    // to ensure isLoading becomes false
    if (dbData?.data) {
      setData({
        ...data,
        ...dbData.data,
        image: dbData.data.image ? baseURL + dbData.data.image : ''
      })
    } else {
      setData({ ...data })
    }
  }, [dbData?.data, setData]) // Adding dependencies is best practice

  const handleToggleModal = () => {
    setToggleModal(true)
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

      <DataMainArea />

      <SpacerDefault />
    </>
  )
}



function DataMainArea() {
  const { preData, isLoading } = useServiceStore()

  const updated = preData.updatedAt ? formatDate(preData.updatedAt) : 'Not Added yet.'
  const user = preData?.user?.name ? preData?.user?.name : preData?.user?.email
  const priority = preData.priority ? preData.priority.toString() : 'Not Added yet.'


  if (isLoading) {
    return <LoaderPrimary />
  }

  return (
    <section className='container__primary bg-white drop-shadow-lg rounded-lg p-6 space-y-4'>

      <RecordImage label='Image' value={preData.image} />
      <RecordDefault label='Name' value={valueWithFallback(preData.name)} />
      <RecordDefault label='Status'
        value={<div className='flex'><StickerOne name={preData.status} condition='Published' /></div>} />
      <RecordDefault label='Description' value={<HtmlViewer htmlContent={preData.description} />} />
      <RecordDefault label='Priority' value={valueWithFallback(priority)} />
      <RecordDefault label='Last Updated' value={valueWithFallback(updated)} />
      <RecordDefault label='Author' value={valueWithFallback(user)} />

      <SpacerPrimary />
    </section>
  )
}

