import { UserEntity, UserInterface } from "@/app/admin/_data/entity/UserEntity"


export interface ServiceInterface {
    id: string | number
    userId: number | string
    priority: string | number
    name: string
    status: string
    description: string
    image: string
    imageUpload: File | null
    createdAt: string
    updatedAt: string
    user: UserInterface
}


export const ServiceEntity: ServiceInterface = {
    id: "",
    userId: "",
    name: "",
    status: "",
    description: "",
    image: "",
    imageUpload: null,
    priority: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
};