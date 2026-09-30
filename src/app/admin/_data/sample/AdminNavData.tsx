import { AdminNavInterface } from "../entity/AdminNavEntity";



export const AdminNavData: AdminNavInterface[] = [
    {
        id: 1,
        iconType: 'info',
        name: 'App Information',
        href: '/admin/app-info',
        css: `bg-linear-to-br from-blue-500 to-blue-800 hover:bg-linear-to-br hover:from-blue-500 hover:to-blue-950`
    },
    {
        id: 2,
        iconType: 'user',
        name: 'Users',
        href: '/admin/user',
        css: `bg-linear-to-br from-sky-500 to-sky-800 hover:bg-linear-to-br hover:from-sky-500 hover:to-sky-950`
    },

    {
        id: 3,
        iconType: 'service',
        name: 'Services',
        href: '/admin/service',
        css: `bg-linear-to-br from-green-500 to-green-800 hover:bg-linear-to-br hover:from-green-500 hover:to-green-950`
    },
    {
        id: 4,
        iconType: 'news',
        name: 'News',
        href: '/admin/news',
        css: `bg-linear-to-br from-teal-500 to-teal-800 hover:bg-linear-to-br hover:from-teal-500 hover:to-teal-950`
    },
    {
        id: 5,
        iconType: 'message',
        name: 'Messages',
        href: '/admin/message',
        css: `bg-linear-to-br from-sky-500 to-sky-800 hover:bg-linear-to-br hover:from-sky-500 hover:to-sky-950`
    },
]
