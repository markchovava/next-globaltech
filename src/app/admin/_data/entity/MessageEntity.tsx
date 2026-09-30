import { UserEntity, UserInterface } from "./UserEntity"


export interface MessageInterface {
    id: string | number
    userId: string | number
    email: string
    message: string
    title: string
    status: string,
    createdAt: string
    updatedAt: string
    user: UserInterface
}


export const MessageEntity: MessageInterface = {
    id: "",
    userId: "",
    email: "",
    title: "",
    message: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity,
};