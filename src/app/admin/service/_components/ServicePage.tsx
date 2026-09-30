"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '../../_components/headings/HeadingDefault'
import ButtonAdmin from '../../_components/buttons/ButtonAdmin'
import TextInputAdminSearch from '../../_components/forms/inputs/TextInputAdminSearch'
import ButtonAdminSearch from '../../_components/buttons/ButtonAdminSearch'
import ActionButtons from '../../_components/buttons/ActionButtons'
import { useEffect } from 'react'
import PaginateDefault from '../../_components/paginations/PaginateDefault'
import PlaceholderMobileDefault from '../../_components/placeholders/PlaceholderMobileDefault'
import PlaceholderDefault from '../../_components/placeholders/PlaceholderDefault'
import LoaderPrimary from '../../_components/loaders/LoaderPrimary'
import { toast } from 'react-toastify'
import { valueWithFallback } from '@/_utils/StringManipulation'
import { _serviceDeleteAction } from '../../_data/actions/ServiceActions'
import { useServiceStore } from '../../_data/store/useServiceStore'
import StickerOne from '../../_components/stickers/StickerOne'




interface Props {
    dbData: any
}

export default function ServicePage({
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
    } = useServiceStore()

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

    return (
        <>
            <SpacerDefault />
            <HeadingDefault title="Services" />
            <SpacerPrimary />

            <section className='container__primary bg-white drop-shadow-lg rounded-lg px-5 py-3 flex items-center justify-between'>
                <form onSubmit={handleSearch} className='lg:w-[60%] w-full flex items-center justify-start rounded-full border border-gray-300'>
                    <TextInputAdminSearch
                        type='text'
                        placeholder='Enter Search here...'
                        onChange={setSearch}
                        value={search}
                    />
                    <ButtonAdminSearch type="submit" status={isSearching} />
                </form>
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
    } = useServiceStore()

    async function handleDelete(id: string | number) {
        setIsLoading(true)
        try {
            const res = await _serviceDeleteAction(id)
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
            <section className='container__primary hidden lg:block drop-shadow-lg'>
                {/* HEADER */}
                <div className='bg-gray-100 w-full border border-gray-300 flex items-center justify-start font-medium'>
                    <div className='w-[40%] px-4 py-3 border-r border-gray-300'>NAME</div>
                    <div className='w-[20%] px-4 py-3 border-r border-gray-300'>STATUS</div>
                    <div className='w-[30%] px-4 py-3 border-r border-gray-300'>USER</div>
                    <div className='w-[10%] px-4 py-3 '>ACTIONS</div>
                </div>
                {/* TABLE ROW */}
                {dataList && dataList.length > 0 ?
                    dataList.map((i, key) => (
                        <div key={key} className='w-full bg-white border-x border-b border-gray-300 flex items-center justify-start'>
                            <div className='w-[40%] px-4 py-3 border-r border-gray-300'>
                                <p>{valueWithFallback(i.name)}</p>
                                <p>Priority: {valueWithFallback(i.priority)}</p>
                            </div>
                            <div className='w-[20%] px-4 py-3 border-r border-gray-300 flex'>
                                <StickerOne name={i?.status} condition='Published' />
                            </div>
                            <div className='w-[30%] px-4 py-3 border-r border-gray-300'>
                                {i?.user?.name ? valueWithFallback(i?.user?.name) : 'Not Added yet'}
                            </div>
                            <div className='w-[10%] px-4 py-3 '>
                                <ActionButtons
                                    viewHref={`/admin/service/${i.id}`}
                                    onDelete={() => handleDelete(i.id)} />
                            </div>
                        </div>
                    ))
                    :
                    <PlaceholderDefault />
                }

            </section>

            {/* MOBILE */}
            <section className='container__primary lg:hidden block '>
                {dataList && dataList.length > 0 ?
                    dataList.map((i, key) => (
                        <div key={key} className='w-full drop-shadow-lg bg-white rounded-xl p-6 space-y-3 mb-6'>
                            <div className='w-full flex items-start justify-between'>
                                <div className=''>
                                    <p className='font-light'>Name</p>
                                    <p>{valueWithFallback(i.name)}</p>
                                </div>
                                <ActionButtons
                                    viewHref={`/admin/service/${i.id}`}
                                    onDelete={() => handleDelete(i.id)} />
                            </div>
                            <div className=''>
                                <p className='font-light'>User</p>
                                <p>{i?.user?.name ? valueWithFallback(i?.user?.name) : i?.user?.email}</p>
                            </div>
                            <div className=''>
                                <p className='font-light'>Status</p>
                                <StickerOne name={i?.status} condition='Published' />
                            </div>
                            <div className=''>
                                <p className='font-light'>Priority</p>
                                <p>{valueWithFallback(i.priority)}</p>
                            </div>
                        </div>
                    ))
                    :
                    <PlaceholderMobileDefault />
                }

            </section>
        </>
    )
}
