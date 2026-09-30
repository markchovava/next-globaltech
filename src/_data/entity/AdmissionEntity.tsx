export interface AdmissionInterface {
    id: string | number
    userId: string | number
    name: string
    email: string
    phone: string
    address: string
    parentName: string
    parentEmail: string
    parentPhone: string
    levelId: string | number
    status: string
    updatedAt: string
    createdAt: string
}

export const AdmissionEntity: AdmissionInterface = {
    id: '',
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    levelId: '',
    status: '',
    updatedAt: '',
    createdAt: '',
}