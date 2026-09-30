export interface MediaImageInterface {
    id: string | number
    mediaId: string | number
    userId: string | number
    image: string
    imageFile: File | null
    createdAt: string
    updatedAt: string
}

export const MediaImageEntity: MediaImageInterface = {
    id: '',
    mediaId: '',
    userId: '',
    image: '',
    imageFile: null,
    createdAt: '',
    updatedAt: '',
}



export interface MediaInterface {
    id: string | number
    userId: string | number
    name: string
    description: string
    images: MediaImageInterface[]
    createdAt: string
    updatedAt: string
}

export const MediaEntity: MediaInterface = {
    id: '',
    userId: '',
    name: '',
    description: '',
    images: [],
    createdAt: '',
    updatedAt: '',
}
