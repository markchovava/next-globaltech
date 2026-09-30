export interface NavInterface {
    id: number
    name: string
    href: string
    isActive: boolean
}


export const NavEntity: NavInterface = {
    id: 0,
    name: '',
    href: '',
    isActive: false
}