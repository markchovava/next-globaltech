import { ReactNode } from "react"

export interface OfferInterface {
    id: string | number
    userId?: string | number
    name: string
    image: string
    imageFile?: File | null
    details: ReactNode
    updatedAt?: string
    createdAt?: string
}


export const OfferEntity: OfferInterface = {
    id: '',
    name: '',
    userId: '',
    image: '',
    imageFile: null,
    details: '',
    updatedAt: '',
    createdAt: '',
}