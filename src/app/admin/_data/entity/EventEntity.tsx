import { UserEntity, UserInterface } from "./UserEntity"

export interface EventInterface {
    id: string | number
    userId: string | number
    name: string
    desc: string
    venue: string
    date: string
    priority: string | number
    image: string
    imageUpload: File | null
    status: string
    createdAt: string
    updatedAt: string
    user: UserInterface
}

export const EventEntity: EventInterface = {
    id: '',
    userId: '',
    name: '',
    desc: '',
    venue: '',
    date: '',
    priority: '',
    image: '',
    imageUpload: null,
    status: '',
    createdAt: '',
    updatedAt: '',
    user: UserEntity,
}