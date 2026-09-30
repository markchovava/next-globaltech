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

export default function SectionOneDark({
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
            <section className="relative bg-green-950 text-neutral-100 overflow-hidden">

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

                    {/* Artistic Overlapping Graphic Column — "material specimen board" */}
                    <div className={`${col1} relative w-full h-125 flex items-center justify-center`}>

                        {/* Background Card Left (60%) — paper stock swatch */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotate: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotate: -7 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ rotate: -2, scale: 1.02 }}
                            className={`absolute overflow-hidden rounded-xl top-2 left-2 w-[60%] h-72 
                                shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)] 
                                border border-green-800 cursor-pointer`} >

                            <Image
                                src={image1}
                                fill
                                sizes="(max-width: 1024px) 60vw, 30vw"
                                className='object-cover'
                                alt='Image'
                            />
                        </motion.div>

                        {/* Background Card Right (40%) — citron accent swatch */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotate: 20 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 14 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            whileHover={{ rotate: 8, scale: 1.02 }}
                            className={`absolute overflow-hidden top-0 right-2 w-[40%] h-64 
                            border border-green-800 rounded-xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)] cursor-pointer`}>
                            <Image
                                src={image2}
                                fill
                                sizes="(max-width: 1024px) 60vw, 30vw"
                                className='object-cover'
                                alt='Image'
                            />
                        </motion.div>

                        {/* Foreground Card — forest specimen, the signature piece */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            whileHover={{ rotate: -1, scale: 1.03 }}
                            className={`absolute overflow-hidden bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-64 
                             to-[#0A1F17] rounded-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-green-800 
                             flex items-center justify-center p-6 cursor-pointer`} >
                            <Image
                                src={image3}
                                fill
                                sizes="(max-width: 1024px) 60vw, 30vw"
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
                        <TitleNormal theme='dark' name={title} title={subtitle} />

                        <p className="text-neutral-300 pb-4 text-lg leading-relaxed max-w-md border-b border-green-800">
                            {details}
                        </p>

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
        <div className='w-full grid-cols-2 grid gap-3 text-neutral-200'>
            <div className='border-r border-neutral-300'>
                <p className='text-sm'>Zenith Space</p>
                <p className='text-xl font-bold'>Talk to Experts</p>
            </div>
            <div className='flex justify-start gap-2'>
                <div className='flex items-center justify-center h-14 w-14 bg-green-900 text-white rounded-full overflow-hidden'>
                    <IconDefault type='phone' css='text-xl' />
                </div>
                <div>
                    <p className='text-sm'>need any help?</p>
                    <p className='text-xl font-bold'>+263 775580295</p>

                </div>


            </div>
        </div>
    )
}