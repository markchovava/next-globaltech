"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



/*********************************
 * PUBLIC ACTIONS
 *********************************/
export async function inquiryStoreAction(data: Record<string, any>) {
    const res = await fetch(`${baseURL}inquiry`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/admin/inquiry');
    return await res.json();
}

export async function inquiryListAction() {
    const res = await fetch(`${baseURL}inquiry`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function inquiryAllAction() {
    const res = await fetch(`${baseURL}inquiry-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function inquiryViewAction(id: number | string) {
    const res = await fetch(`${baseURL}inquiry/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function inquirySearchAction(search: string) {
    const res = await fetch(`${baseURL}inquiry-search?search=${search}`, {
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

export async function _inquiryListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _inquiryPaginateAction(url: string) {
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

export async function _inquiryAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _inquirySearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _inquiryViewAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _inquiryStoreAction(data: Record<string, any>) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/inquiry');
    return await res.json();
}

export async function _inquiryUpdateAction(id: string | number, data: Record<string, any>) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath(`/admin/inquiry/${id}`);
    revalidatePath('/admin/inquiry'); // Additionally clearing container list to display update changes immediately
    return await res.json();
}

export async function _inquiryStatusUpdateAction(id: string | number, data: Record<string, any>) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry-status/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath(`/admin/inquiry/${id}`);
    revalidatePath('/admin/inquiry'); // Additionally clearing container list to display update changes immediately
    return await res.json();
}

export async function _inquiryDeleteAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/inquiry/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/inquiry');
    return await res.json();
}