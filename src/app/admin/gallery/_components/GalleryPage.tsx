"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '../../_components/headings/HeadingDefault'
import { useEffect, useState } from 'react'
import PaginateDefault from '../../_components/paginations/PaginateDefault'
import PlaceholderDefault from '../../_components/placeholders/PlaceholderDefault'
import LoaderPrimary from '../../_components/loaders/LoaderPrimary'
import { toast } from 'react-toastify'
import { NoImageData } from '@/_data/sample/NoImage'
import ButtonAdmin from '../../_components/buttons/ButtonAdmin'
import GalleryCard from '../../_components/cards/GalleryCard'
import { useGalleryStore } from '../../_data/store/useGalleryStore'
import { _galleryDeleteAction } from '../../_data/actions/GalleryActions'
import { baseURL } from '@/_api/baseURL'
import ImageLightbox from '../../_components/lightbox/ImageLightbox'



interface Props {
    dbData: any
    title: string
}

const ERROR_MESSAGE = "Something went wrong, please try again."

export default function GalleryPage({
    dbData,
    title
}: Props
) {
    // console.log('GALLERY dbData:: ', dbData)
    const {
        search,
        isSearching,
        setSearch,
        setToggleModal,
        toggleModal,
        setDataList,
        meta,
        links,
        getSearchDatalist,
        getPaginatedDatalist,
    } = useGalleryStore()

    useEffect(() => {
        setDataList(dbData)
    }, [dbData.data, setDataList])

    // console.log("dbData:: ", dbData)

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handlePaginate(url: string) {
        await getPaginatedDatalist(url)
    }



    // console.log('FROM DB', dbData)

    return (
        <>
            <SpacerDefault />
            <HeadingDefault title={title} />
            <SpacerPrimary />

            <section className='container__primary py-3 flex items-center justify-end'>
                <ButtonAdmin
                    onClick={handleToggleModal}
                    name='Add'
                    css="px-8 py-3 text-white"
                />
            </section>
            <SpacerPrimary />

            <MainDataArea />

            <SpacerPrimary />

            <section className='container__primary flex items-center justify-end gap-3'>
                <PaginateDefault
                    meta={meta}
                    links={links}
                    handlePaginate={handlePaginate} />
            </section>

            <SpacerDefault />
        </>
    )
}


function MainDataArea() {
    const {
        isLoading,
        dataList,
        setIsLoading,
        getDataList
    } = useGalleryStore()

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const lightboxImages = (dataList ?? []).map((i: any) => ({
        src: baseURL + i?.image,
        caption: i?.event?.name,
    }))

    async function handleDelete(id: string | number) {
        setIsLoading(true)
        try {
            const res = await _galleryDeleteAction(id)
            const { status, message } = res
            if (status === 1) {
                toast.success(message)
                setLightboxIndex(null)
                await getDataList()
                setIsLoading(false)
                return
            }
            else {
                toast.warn(ERROR_MESSAGE)
                setIsLoading(false)
                return
            }
        } catch (error) {
            console.error('Delete error: ', error);
            toast.warn(ERROR_MESSAGE)
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <LoaderPrimary />
        )
    }

    return (
        <>
            <section className='container__primary'>
                {dataList && dataList.length > 0 ?
                    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
                        {dataList.map((i: any, key: number) => (
                            <GalleryCard
                                key={i?.id ?? key}
                                image={baseURL + i?.image}
                                text={i?.event?.name}
                                deleteBtn={() => handleDelete(i?.id)}
                                viewBtn={() => setLightboxIndex(key)}
                            />
                        ))}
                    </div>
                    :
                    <PlaceholderDefault />
                }
            </section>

            <ImageLightbox
                images={lightboxImages}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
            />
        </>
    )
}