"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";


/*********************************
 * PUBLIC ACTIONS
 *********************************/

export async function serviceFrontAction() {
    const res = await fetch(`${baseURL}service-front`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function serviceAllAction() {
    const res = await fetch(`${baseURL}service-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function serviceListAction() {
    const res = await fetch(`${baseURL}service`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function servicePaginateAction(url: string) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function serviceSearchAction(search: string) {
    const res = await fetch(`${baseURL}service-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function serviceViewAction(id: string | number) {
    const res = await fetch(`${baseURL}service/${id}`, {
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

export async function _serviceAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _serviceListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _servicePaginateAction(url: string) {
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

export async function _serviceSearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _serviceViewAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _serviceDeleteAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/service');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}

export async function _serviceStoreAction(data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,

        }
    });
    revalidatePath('/admin/service');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}

export async function _serviceUpdateAction(id: string | number, data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/service/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/service/${id}`);
    revalidatePath('/admin/service');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}