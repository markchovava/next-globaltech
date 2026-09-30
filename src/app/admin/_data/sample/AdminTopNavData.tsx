import { AdminTopNavDropdownInterface, AdminTopNavInterface } from "../entity/AdminNavEntities";


export const UserTopNavDropdownData: AdminTopNavDropdownInterface[] = [
    { id: 1, name: 'Profile', href: '/admin/profile' },
]

export const AdminTopNavData: AdminTopNavInterface[] = [
    { id: 1, name: "Home", href: '/', iconType: 'home', items: [] },
    { id: 2, name: "User", href: '#', iconType: 'person', items: UserTopNavDropdownData },
];