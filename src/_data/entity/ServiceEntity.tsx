import { ReactNode } from "react"
import { UserEntity, UserInterface } from "./UserEntity"


export interface ServiceInterface {
    id: string | number
    userId: string | number
    name: string
    image: string
    imageFile: File | null
    priority: string | number
    desc: string
    createdAt: string
    updatedAt: string
    user: UserInterface
}

export const ServiceEntity: ServiceInterface = {
    id: '',
    userId: '',
    name: '',
    image: '',
    imageFile: null,
    desc: '',
    priority: '',
    updatedAt: '',
    createdAt: '',
    user: UserEntity,
}