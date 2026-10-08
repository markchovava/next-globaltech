import { ServiceEntity, ServiceInterface } from "./ServiceEntity"
import { UserEntity, UserInterface } from "./UserEntity"

export interface InquiryInterface {
    id: string | number
    userId: string | number
    serviceId: string | number
    serviceName: string
    customerName: string
    customerPhone: string
    customerAddress: string
    customerEmail: string
    message: string
    status: string
    createdAt: string
    updatedAt: string
    user: UserInterface
    service: ServiceInterface
}


export const InquiryEntity: InquiryInterface = {
    id: '',
    userId: '',
    serviceId: '',
    serviceName: '',
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerEmail: '',
    message: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    user: UserEntity,
    service: ServiceEntity,
}