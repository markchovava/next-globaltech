import { UserEntity, UserInterface } from "@/app/admin/_data/entity/UserEntity"


export interface BrandInterface {
    id: string | number
    userId: number | string
    name: string
    image: string
    imageUpload: File | null
    priority: string | number
    createdAt: string
    updatedAt: string
    user: UserInterface
}


export const BrandEntity: BrandInterface = {
    id: "",
    userId: "",
    name: "",
    image: "",
    imageUpload: null,
    priority: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
};