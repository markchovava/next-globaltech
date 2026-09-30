export interface AdminTopNavDropdownInterface{
    id: string | number
    name: string
    href: string
}

export interface AdminTopNavInterface {
    id: string | number
    name: string
    iconType: string
    href: string
    items: AdminTopNavDropdownInterface[]
}

export interface AdminFooterNavInterface{
    id: number | string 
    name: string
    href: string
}