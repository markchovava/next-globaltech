"use client"
import { motion, Variants } from 'motion/react'
import Spacer from '../spacers/Spacer'
import TitleNormal from '../titles/TitleNormal'
import { SubjectInterface } from '@/_data/entity/SubjectEntity'

interface Props {
    title: string
    subtitle: string
    data: SubjectInterface[]
}

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
}

const item: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.94 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
}

export default function SubjectSection({
    title,
    subtitle,
    data,
}: Props) {
    return (
        <>
            <div className=''>
                <Spacer />
                <section className='container__primary'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <TitleNormal
                            name={`Our Subjects`}
                            title={title}
                        />
                    </motion.div>

                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'
                        variants={container}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {data.map((i, key) => (
                            <Item key={i.name ?? key} name={i.name} />
                        ))}
                    </motion.div>
                </section>
                <Spacer />
            </div>
        </>
    )
}

interface pInterface {
    name: string
}

function Item({ name }: pInterface) {
    return (
        <motion.div
            variants={item}
            whileHover={{
                y: -6,
                scale: 1.03,
                rotate: -0.5,
                transition: { type: 'spring', stiffness: 300, damping: 15 },
            }}
            whileTap={{ scale: 0.97 }}
            className='bg-white p-4 drop-shadow hover:drop-shadow-xl rounded-xl cursor-pointer'
        >
            {name}
        </motion.div>
    )
}