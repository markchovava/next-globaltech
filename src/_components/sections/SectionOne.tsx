"use client"
import Link from 'next/link'
import Spacer from '../spacers/Spacer'
import { motion } from 'motion/react'
import Button from '../buttons/Button'
import IconDefault from '../icons/IconDefault'
import TitleNormal from '../titles/TitleNormal'
import { ReactNode } from 'react'
import { NoImageData } from '@/_data/sample/NoImage'
import Image from 'next/image'



interface Props {
    dir?: 'right' | 'left'
    title: string
    subtitle: string
    details: ReactNode
    href?: string
    btnName?: string
    image1?: string
    image2?: string
    image3?: string
}

export default function SectionOne({
    dir = 'right',
    title,
    subtitle,
    details,
    href = '#',
    btnName = '',
    image1 = NoImageData,
    image2 = NoImageData,
    image3 = NoImageData,
}: Props) {
    const col1 = dir === 'right' ? 'lg:order-2' : 'lg:order-1'
    const col2 = dir === 'right' ? 'lg:order-1' : 'lg:order-2'

    return (
        <>
            <section className="relative text-neutral-900 overflow-hidden">
                {/* Ambient grain texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
                {/* Soft dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.5]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(20,35,28,0.09) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />

                <Spacer />
                <div className="container__primary relative mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Single Foreground Graphic Column */}
                    <div className={`${col1} relative w-full h-125`}>

                        {/* Foreground Card — the signature piece, fills the whole column */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            whileHover={{ rotate: -1, scale: 1.03 }}
                            className={`relative w-full h-full bg-white rounded-xl shadow-[0_30px_70px_-15px_rgba(9,46,32,0.45)] border 
                                border-gray-200 overflow-hidden cursor-pointer`}>
                            <Image
                                src={image3}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className='object-cover'
                                alt='Image'
                            />
                        </motion.div>

                    </div>
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className={`${col2} flex flex-col justify-center space-y-6`} >

                        <TitleNormal
                            name={title}
                            title={subtitle}
                        />

                        <div className={`pb-4 text-neutral-700 text-lg leading-relaxed max-w-md 
                            border-b border-gray-300`}>
                            {details}
                        </div>

                        <BottomContent />


                        {btnName &&
                            <div>
                                <Link href={href}>
                                    <Button
                                        name={btnName}
                                        css="text-lg py-3 px-9 text-white"
                                    />
                                </Link>
                            </div>
                        }

                    </motion.div>

                </div>
                <Spacer />
            </section>
        </>
    )
}


function BottomContent() {

    return (
        <div className='w-full grid-cols-2 grid gap-3 text-green-950'>
            <div className='border-r border-gray-300'>
                <p className='text-sm'>
                    Zenith Space
                </p>
                <p className='text-xl font-bold'>
                    Talk to Experts
                </p>
            </div>
            <div className='flex justify-start gap-2'>
                <div className={`flex items-center justify-center h-14 w-14 bg-green-900 text-white rounded-full overflow-hidden`}>
                    <IconDefault
                        type='phone'
                        css='lg:text-xl text-lg'
                    />
                </div>
                <div>
                    <p className='md:text-sm text-xs'>need any help?</p>
                    <p className='text-xl font-bold'>+263 775580295</p>

                </div>


            </div>
        </div>
    )
}