import { EventEntity, EventInterface } from "./EventEntity"
import { UserEntity, UserInterface } from "./UserEntity"

export interface GalleryInterface {
    id: string | number
    userId: string | number
    image: string
    imageUpload: File | null
    user: UserInterface
    event: EventInterface
    createdAt: string
    updatedAt: string
}


export const GalleryEntity: GalleryInterface = {
    id: '',
    userId: '',
    image: '',
    imageUpload: null,
    user: UserEntity,
    event: EventEntity,
    createdAt: '',
    updatedAt: '',
}