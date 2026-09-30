import { UserEntity, UserInterface } from "./UserEntity"

export interface CarImageInterface {
    id: string | number
    uid: string | number // custom made
    userId: string | number
    carId: string | number
    image: string
    imageFile: File | null
    updatedAt: string
    createdAt: string
}

export const CarImageEntity: CarImageInterface = {
    id: '',
    uid: '',// custom made
    userId: '',
    carId: '',
    image: '',
    imageFile: null,
    updatedAt: '',
    createdAt: '',
}

export const CarImageListEntity: CarImageInterface[] = [
    { ...CarImageEntity, uid: 1 },
    { ...CarImageEntity, uid: 2 },
    { ...CarImageEntity, uid: 3 },
    { ...CarImageEntity, uid: 4 },
]

export interface CarPropertyInterface {
    id: string
    userId: string
    name: string
    value: string | number
    updatedAt: string
    createdAt: string
}

export const CarPropertyEntity: CarPropertyInterface = {
    id: '',
    userId: '',
    name: '',
    value: '',
    updatedAt: '',
    createdAt: '',
}

export interface CarInterface {
    id: string | number
    brandId: string | number
    userId: string | number
    priority: string
    name: string
    price: number | string
    year: string
    fuel: string
    condition: string
    engineCapacity: string
    transmission: string
    mileage: string
    description: string
    createdAt: string
    updatedAt: string
    images: CarImageInterface[]
    properties: CarPropertyInterface[]
    user: UserInterface
}

export const CarEntity: CarInterface = {
    id: '',
    brandId: '',
    userId: '',
    name: '',
    price: '',
    year: '',
    fuel: '',
    condition: '',
    engineCapacity: '',
    transmission: '',
    mileage: '',
    description: '',
    priority: '',
    createdAt: '',
    updatedAt: '',
    images: [],
    properties: [],
    user: UserEntity,
}