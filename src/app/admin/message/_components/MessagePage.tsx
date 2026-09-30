"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '../../_components/headings/HeadingDefault'
import ButtonAdmin from '../../_components/buttons/ButtonAdmin'
import { useMessageStore } from '../../_data/store/useMessageStore'
import TextInputAdminSearch from '../../_components/forms/inputs/TextInputAdminSearch'
import ButtonAdminSearch from '../../_components/buttons/ButtonAdminSearch'
import ActionButtons from '../../_components/buttons/ActionButtons'
import { useEffect } from 'react'
import PaginateDefault from '../../_components/paginations/PaginateDefault'
import PlaceholderMobileDefault from '../../_components/placeholders/PlaceholderMobileDefault'
import PlaceholderDefault from '../../_components/placeholders/PlaceholderDefault'
import LoaderPrimary from '../../_components/loaders/LoaderPrimary'
import { _messageDeleteAction } from '../../_data/actions/MessageActions'
import { toast } from 'react-toastify'
import { formatDate } from '@/_utils/formatDate'
import { valueWithFallback } from '@/_utils/StringManipulation'
import StickerDefault from '../../_components/stickers/StickerDefault'



interface Props {
    dbData: any
}

export default function MessagePage({ dbData }: Props) {
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
    } = useMessageStore()

    console.log('dbData:: ', dbData)

    useEffect(() => {
        setDataList(dbData)
    }, [dbData.data, setDataList])

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
            <HeadingDefault title="Messages" />
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
    } = useMessageStore()

    async function handleDelete(id: string | number) {
        setIsLoading(true)
        try {
            const res = await _messageDeleteAction(id)
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
                    <div className='w-[30%] px-4 py-3 border-r border-gray-300'>EMAIL</div>
                    <div className='w-[30%] px-4 py-3 border-r border-gray-300'>TITLE</div>
                    <div className='w-[15%] px-4 py-3 border-r border-gray-300'>STATUS</div>
                    <div className='w-[15%] px-4 py-3 border-r border-gray-300'>DATE</div>
                    <div className='w-[10%] px-4 py-3 '>ACTIONS</div>
                </div>
                {/* TABLE ROW */}
                {dataList && dataList.length > 0 ?
                    dataList.map((i, key) => (
                        <div key={key} className='w-full bg-white border-x border-b border-gray-300 flex items-center justify-start'>
                            <div className='w-[30%] px-4 py-3 border-r border-gray-300'>
                                {valueWithFallback(i?.email)}</div>
                            <div className='w-[30%] px-4 py-3 border-r border-gray-300'>
                                {valueWithFallback(i?.title)}</div>
                            <div className='w-[15%] px-4 py-3 border-r border-gray-300'>
                                <StickerDefault label={valueWithFallback(i?.status)} css='px-1.5 py-0.5' />
                            </div>
                            <div className='w-[15%] px-4 py-3 border-r border-gray-300'>
                                {valueWithFallback(formatDate(i?.createdAt))}
                            </div>
                            <div className='w-[10%] px-4 py-3 '>
                                <ActionButtons
                                    viewHref={`/admin/message/${i.id}`}
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
                                    <p className='font-light'>Email</p>
                                    <p>{valueWithFallback(i?.email)}</p>
                                </div>
                                <ActionButtons
                                    viewHref={`/admin/message/${i.id}`}
                                    onDelete={() => handleDelete(i?.id)} />
                            </div>
                            <div className=''>
                                <p className='font-light'>Title</p>
                                <p>{valueWithFallback(i?.title)}</p>
                            </div>
                            <div className=''>
                                <p className='font-light'>Status</p>
                                <p><StickerDefault label={valueWithFallback(i?.status)} css='px-1.5 py-0.5' /></p>
                            </div>
                            <div className=''>
                                <p className='font-light'>Created</p>
                                <p>{valueWithFallback(formatDate(i?.createdAt))}</p>
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
