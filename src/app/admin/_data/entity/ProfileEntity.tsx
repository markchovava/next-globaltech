export interface ProfileInterface{
    id: string | number
    name: string
    phone: string
    email: string
    address: string
    isAdmin: string | number
    roleLevel: number | string
    password: string
    passwordConfirm: string
    code: string
    createdAt: string
    updatedAt: string
}


export const ProfileEntity: ProfileInterface = {
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    isAdmin: "",
    roleLevel: "",
    password: "",
    passwordConfirm: "",
    code: "",
    createdAt: "",
    updatedAt: "",
};