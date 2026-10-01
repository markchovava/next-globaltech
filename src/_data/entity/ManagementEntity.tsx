import { ReactNode } from "react";

export interface ManagementInterface {
    id: number | string
    name: string
    image?: string
    imageFile?: File | null
    position: string;
    qualifications: ReactNode;
}

export const ManagementEntity: ManagementInterface = {
    id: '',
    name: '',
    image: '',
    imageFile: null,
    position: '',
    qualifications: <></>,
};