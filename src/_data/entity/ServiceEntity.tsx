import { ReactNode } from "react"


export interface ServiceInterface {
    id: string | number
    name: string
    image: string
    imageFile: File | null
    desc: ReactNode
}

export const ServiceEntity: ServiceInterface = {
    id: '',
    name: '',
    image: '',
    imageFile: null,
    desc: <></>,
}