export interface AppInfoInterface {
    id: string | number
    userId: string | number
    name: string
    image: string | null
    description: string | null
    phone: string | null
    email: string | null
    website: string | null
    address: string | null
    whatsapp: string | null
    facebook: string | null
    instagram: string | null
    tiktok: string | null
    linkedin: string | null
    twitter: string | null
    createdAt: string
    updatedAt: string
}

export const AppInfoEntity: AppInfoInterface = {
    id: "",
    userId: "",
    name: "",
    image: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: '',
    twitter: '',
    createdAt: '',
    updatedAt: ''
}