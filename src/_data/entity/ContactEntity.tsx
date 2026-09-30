export interface ContactInterface {
    id: number
    name: string
    email: string
    message: string
    phone: string
    subject: string
    createdAt: string
}


export const ContactEntity: ContactInterface = {
    id: 0,
    name: '',
    email: '',
    message: '',
    phone: '',
    subject: '',
    createdAt: '',
}