"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import { useInquiryStore } from '../../../_data/store/useInquiryStore'
import HeadingDefault from '@/app/admin/_components/headings/HeadingDefault'
import ButtonAdmin from '@/app/admin/_components/buttons/ButtonAdmin'
import RecordDefault from '@/app/admin/_components/records/RecordDefault'
import { InquiryEntity } from '../../../_data/entity/InquiryEntity'
import { useEffect } from 'react'
import { valueWithFallback } from '@/_utils/StringManipulation'
import { formatDate } from '@/_utils/formatDate'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'
import StickerDefault from '@/app/admin/_components/stickers/StickerDefault'



const title = "View Inquiry"

interface Props {
  id: string | number
  dbData: any
}

export default function InquiryViewPage({ dbData, id }: Props) {
  const {
    setData,
    toggleModal,
    setToggleModal,
  } = useInquiryStore()

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

      <MainDataSection />
      <SpacerDefault />
    </>
  )
}



function MainDataSection() {
  const {
    preData,
    isLoading,
  } = useInquiryStore()
  const created = preData.createdAt ? formatDate(preData?.createdAt) : 'Not Added yet.'

  if (isLoading) {
    return (
      <LoaderPrimary />
    )
  }

  return (
    <section className='container__primary bg-white drop-shadow-lg rounded-lg p-6 space-y-4'>
      <RecordDefault label='Service Name' value={valueWithFallback(preData?.serviceName)} />
      <RecordDefault label='Customer Name' value={valueWithFallback(preData?.customerName)} />
      <RecordDefault label='Phone' value={valueWithFallback(preData?.customerPhone)} />
      <RecordDefault label='Email' value={valueWithFallback(preData?.customerEmail)} />
      <RecordDefault label='Address' value={valueWithFallback(preData?.customerAddress)} />
      <RecordDefault
        label='Status'
        value={<StickerDefault
          label={valueWithFallback(preData?.status)} css='px-1.5 py-0.5' />}
      />
      <RecordDefault label='Message' value={valueWithFallback(preData?.message)} />
      <RecordDefault label='Date' value={created} />
      <SpacerPrimary />
    </section>
  )
}
