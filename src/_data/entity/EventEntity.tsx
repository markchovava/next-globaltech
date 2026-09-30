import { ReactNode } from "react"

export interface EventInterface {
    id: string | number
    userId: string | number
    name: string
    description: ReactNode
    venue: string
    date: string
    time: string
    status: string
    priority: number | string
    updatedAt: string
    createdAt: string
}


export const EventEntity: EventInterface = {
    id: '',
    userId: '',
    name: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    status: '',
    priority: '',
    updatedAt: '',
    createdAt: '',
}