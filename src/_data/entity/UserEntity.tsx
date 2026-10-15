export interface UserInterface {
    id: string | number
    name: string
    phone: string
    email: string
    address: string
    isAdmin: string | number
    roleLevel: number | string
    password: string
    code: string
    createdAt: string
    updatedAt: string
}


export const UserEntity: UserInterface = {
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    isAdmin: "",
    roleLevel: "",
    password: "",
    code: "",
    createdAt: "",
    updatedAt: "",
};