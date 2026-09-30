export interface QuoteInterface {
    id: number | string
    name: string
    phone: string
    email: string
    address: string
    message: string
    createdAt: string
    updatedAt: string
}


export const QuoteEntity: QuoteInterface = {
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
    createdAt: '',
    updatedAt: '',
}