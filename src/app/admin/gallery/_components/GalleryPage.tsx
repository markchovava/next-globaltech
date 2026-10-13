"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '../../_components/headings/HeadingDefault'
import { useEffect } from 'react'
import PaginateDefault from '../../_components/paginations/PaginateDefault'
import PlaceholderDefault from '../../_components/placeholders/PlaceholderDefault'
import LoaderPrimary from '../../_components/loaders/LoaderPrimary'
import { toast } from 'react-toastify'
import { _eventDeleteAction } from '../../_data/actions/EventActions'
import { useEventStore } from '../../_data/store/useEventStore'
import { NoImageData } from '@/_data/sample/NoImage'
import Image from 'next/image'



interface Props {
    dbData: any
    title: string
}

export default function GalleryPage({
    dbData }: Props
) {
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
    } = useEventStore()

    useEffect(() => {
        // Call setData even if dbData.data is null 
        // to ensure isLoading becomes false
        setDataList(dbData)
    }, [dbData.data, setDataList]) // Adding dependencies is best practice

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handlePaginate(url: string) {
        await getPaginatedDatalist(url)
    }

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await getSearchDatalist(search)
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }

    // console.log('FROM DB', dbData)

    return (
        <>
            <SpacerDefault />
            <HeadingDefault title="Events" />
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
    } = useEventStore()

    async function handleDelete(id: string | number) {
        setIsLoading(true)
        try {
            const res = await _eventDeleteAction(id)
            const { data, status, message } = res
            if (status === 1) {
                toast.success(message)
                await getDataList()
                setIsLoading(false)
                return
            }
            toast.warn('Something went wrong, please try again.')
            setIsLoading(false)
            return
        } catch (error) {
            console.error('Delete error: ', error);
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
            {/* DESKTOP */}
            <section className='container__primary '>

                <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mb-6'>

                </div>

                {/* TABLE ROW */}
                {dataList && dataList.length > 0 ?
                    dataList.map((i, key) => (
                        <div key={key} className='w-full bg-white border-x border-b border-gray-300 flex items-center justify-start'>
                            Text
                        </div>
                    ))
                    :
                    <PlaceholderDefault />
                }

            </section>


        </>
    )
}
