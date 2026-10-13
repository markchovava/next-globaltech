import { EventEntity, EventInterface } from "./EventEntity"
import { UserEntity, UserInterface } from "./UserEntity"



export interface GalleryInterface {
    id: string | number
    eventId: string | number
    userId: string
    image: string
    imageUpload: File | null
    createdAt: string
    updatedAt: string
    user: UserInterface
    event: EventInterface
}


export const GalleryEntity: GalleryInterface = {
    id: '',
    eventId: '',
    userId: '',
    image: '',
    imageUpload: null,
    createdAt: '',
    updatedAt: '',
    user: UserEntity,
    event: EventEntity,
}