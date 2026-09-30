"use client"
import { BillCorpNarRegular } from '@/_assets/fonts/BillCorpNar/BillCorpNarFont'
import Button from '../buttons/Button'
import Link from 'next/link'
import { AppInfoData } from '@/_data/sample/AppinfoData'



export default function Banner() {
    return (
        <>
            <section
                style={{ backgroundImage: 'url(/assets/images/banner/main_toyota.jpg)' }}
                className="w-full lg:block hidden h-150 bg-gray-200 bg-right bg-fixed">
                <div className="container__primary flex items-center justify-start h-full">
                    <div className="lg:w-[45%] w-[80%] bg-white/80 drop-shadow-lg py-6 px-4 rounded-lg">
                        <h1 className={`${BillCorpNarRegular.className} text-5xl text-gray-800 leading-none mb-3`}>
                            Welcome to Own One
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-3">
                            {AppInfoData.about.intro}
                        </p>
                        <div className='mb-5'>
                            <Link href='#' className='rounded-lg w-60 overflow-hidden'>
                                <img
                                    src={`/assets/images/beforward.jpg`}
                                    className='w-60'
                                    alt='Be Forward Logo' />
                            </Link>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <Link href='/buy-a-car'>
                                <Button
                                    name="Buy A Car"
                                    css="text-lg py-3 px-9 text-white"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section
                style={{ backgroundImage: 'url(/assets/images/banner/main_toyota.jpg)' }}
                className="w-full lg:hidden block h-180 bg-gray-200 bg-right">
                <div className="container__primary flex items-center justify-start h-full">
                    <div className="lg:w-[45%] w-[80%] bg-white/80 drop-shadow-lg py-6 px-4 rounded-lg">
                        <h1 className={`${BillCorpNarRegular.className} text-5xl text-gray-800 leading-none mb-2`}>
                            Welcome to Own One
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {AppInfoData.about.intro}
                        </p>
                        <div className='mb-4'>
                            <Link href='#' className='rounded-lg w-60 overflow-hidden'>
                                <img
                                    src={`/assets/images/beforward.jpg`}
                                    className='w-60'
                                    alt='Be Forward Logo' />
                            </Link>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <Link href='/buy-a-car'>
                                <Button
                                    name="Buy A Car"
                                    css="text-lg py-3 px-9 text-white"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
