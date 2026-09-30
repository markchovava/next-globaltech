"use client"
import Spacer from '../spacers/Spacer'
import { motion } from 'motion/react'
import TitleNormal from '../titles/TitleNormal'
import IconDefault from '../icons/IconDefault'
import Link from 'next/link'
import Button from '../buttons/Button'
import { NoImageData } from '@/_data/sample/NoImage'
import { ReactNode } from 'react'
import Image from 'next/image'
import { AppInfoData } from '@/_data/sample/AppinfoData'



interface Props {
    dir?: 'right' | 'left'
    title: string
    subtitle: string
    details: ReactNode
    href?: string
    btnName?: string
    image?: string
    withContact?: boolean
}

export default function SectionPrimaryDark({
    dir = 'right',
    title,
    subtitle,
    details,
    href = '#',
    btnName = '',
    withContact = false,
    image = NoImageData,
}: Props) {
    const col1 = dir === 'right' ? 'lg:order-2' : 'lg:order-1'
    const col2 = dir === 'right' ? 'lg:order-1' : 'lg:order-2'

    return (
        <>
            <section className="relative bg-cyan-800 text-neutral-100 overflow-hidden">

                {/* Ambient grain texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
                {/* Soft dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.5]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />

                <Spacer />
                <div className="container__primary relative mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Foreground Graphic Column — gallery-style presentation */}
                    <div className={`${col1} relative w-full h-125`}>

                        {/* Offset outline card — ghost silhouette behind the image */}
                        <motion.div
                            initial={{ opacity: 0, x: dir === 'right' ? 20 : -20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="absolute -inset-3 rounded-2xl border-2 border-cyan-300/20"
                            style={{
                                clipPath: dir === 'right'
                                    ? 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
                                    : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)',
                            }}
                        />

                        {/* Foreground Card — the signature piece */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            whileHover={{ scale: 1.015 }}
                            className="relative w-full h-full rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] 
                                border border-cyan-800 overflow-hidden cursor-pointer group"
                        >
                            <Image
                                src={image}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                alt="Image"
                            />

                            {/* Depth gradient for legibility + mood */}
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0A1F17]/70 via-transparent to-transparent" />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#0A1F17]/30" />

                            {/* Corner accent marks — gallery/specimen framing */}
                            <span className="absolute top-4 left-4 h-5 w-5 border-t-2 border-l-2 border-lime-200/60" />
                            <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-lime-200/60" />

                            {/* Floating badge */}
                            {/* <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                                className={`absolute top-5 ${dir === 'right' ? 'right-5' : 'left-5'} 
                                    bg-cyan-950/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg 
                                    border border-cyan-800/60 flex items-center gap-2`}
                            >
                                <span className="h-2 w-2 rounded-full bg-lime-300 animate-pulse" />
                                <span className="text-xs font-semibold tracking-wide text-neutral-100 uppercase">
                                    Springvale College
                                </span> 
                            </motion.div> */}
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className={`${col2} flex flex-col justify-center space-y-6`} >
                        <TitleNormal theme='dark' name={title} title={subtitle} />

                        <p className="text-neutral-300 pb-4 text-lg leading-relaxed max-w-md ">
                            {details}
                        </p>

                        {withContact &&
                            <BottomContent />
                        }

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
        <div className='w-full grid-cols-2 grid gap-3 text-neutral-200'>
            <div className='border-r border-neutral-300'>
                <p className='text-sm'>{AppInfoData.name}</p>
                <p className='text-xl font-bold'>Talk to Experts</p>
            </div>
            <div className='flex justify-start gap-2'>
                <div className='flex items-center justify-center h-14 w-14 bg-cyan-900 text-white rounded-full overflow-hidden'>
                    <IconDefault type='phone' css='text-xl' />
                </div>
                <div>
                    <p className='text-sm'>need any help?</p>
                    <p className='text-xl font-bold'>{AppInfoData.phone}</p>

                </div>


            </div>
        </div>
    )
}