"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



/*********************************
 * PUBLIC ACTIONS
 *********************************/
export async function orderStoreAction(data: Record<string, any>) {
    const res = await fetch(`${baseURL}order`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/admin/order');
    return await res.json();
}

export async function orderListAction() {
    const res = await fetch(`${baseURL}order`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function orderAllAction() {
    const res = await fetch(`${baseURL}order-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function orderViewAction(id: number | string) {
    const res = await fetch(`${baseURL}order/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function orderSearchAction(search: string) {
    const res = await fetch(`${baseURL}order-search?search=${search}`, {
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

export async function _orderListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _orderPaginateAction(url: string) {
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

export async function _orderAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _orderSearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _orderViewAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _orderStoreAction(data: Record<string, any>) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/order');
    return await res.json();
}

export async function _orderUpdateAction(id: string | number, data: Record<string, any>) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath(`/admin/order/${id}`);
    revalidatePath('/admin/order'); // Additionally clearing container list to display update changes immediately
    return await res.json();
}

export async function _orderDeleteAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/order/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/order');
    return await res.json();
}