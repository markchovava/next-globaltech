"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



/*********************************
 * PUBLIC ACTIONS
 *********************************/
export async function eventListAction() {
    const res = await fetch(`${baseURL}event`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function eventAllAction() {
    const res = await fetch(`${baseURL}event-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function eventViewAction(id: number | string) {
    const res = await fetch(`${baseURL}event/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function eventSearchAction(search: string) {
    const res = await fetch(`${baseURL}event-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

/*********************************
 * AUTHENTICATED ACTIONS
 *********************************/

export async function _eventListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _eventPaginateAction(url: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _eventAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _eventSearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _eventViewAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _eventStoreAction(data: any) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath('/admin/event');
    return await res.json();
}

export async function _eventUpdateAction(id: string | number, data: any) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/event/${id}`);
    return await res.json();
}

export async function _eventStatusUpdateAction(id: string | number, data: any) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event-status/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/event/${id}`);
    return await res.json();
}

export async function _eventDeleteAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/event/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/event');
    return await res.json();
}