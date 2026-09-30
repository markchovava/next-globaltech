export interface SubjectInterface {
    id: number | string
    name: string
    userId: string | number
    createdAt: string
    updatedAt: string
}

export const SubjectEntity: SubjectInterface = {
    id: '',
    name: '',
    userId: '',
    createdAt: '',
    updatedAt: ''
}