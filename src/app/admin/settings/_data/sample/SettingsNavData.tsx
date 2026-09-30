import { AdminNavInterface } from "@/app/admin/_data/entity/AdminNavEntity";


export const SettingsNavData: AdminNavInterface[] = [
    {
        id: 1,
        iconType: 'info',
        name: 'App Information',
        href: '/admin/app-info',
        css: `bg-linear-to-br from-blue-500 to-blue-800 hover:bg-linear-to-br hover:from-blue-500 hover:to-blue-950`
    },
    /*  {
         id: 2,
         iconType: 'role',
         name: 'Roles',
         href: '/admin/role',
         css: `bg-linear-to-br from-cyan-500 to-cyan-800 hover:bg-linear-to-br hover:from-cyan-500 hover:to-cyan-950`
     }, */

]