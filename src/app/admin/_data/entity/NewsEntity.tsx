import { UserEntity, UserInterface } from "@/app/admin/_data/entity/UserEntity"



export interface NewsInterface {
    id: string | number
    userId: number | string
    priority: string | number
    title: string
    content: string
    image: string
    status: string
    imageUpload: File | null
    category: string
    createdAt: string
    updatedAt: string
    user: UserInterface
}


export const NewsEntity: NewsInterface = {
    id: "",
    userId: "",
    title: "",
    content: "",
    image: "",
    imageUpload: null,
    category: '',
    status: "",
    priority: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
};