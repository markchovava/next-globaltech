"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";


/*********************************
 * PUBLIC ACTIONS
 *********************************/

export async function newsFrontAction() {
    const res = await fetch(`${baseURL}news-front`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function newsAllAction() {
    const res = await fetch(`${baseURL}news-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function newsListAction() {
    const res = await fetch(`${baseURL}news`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function newsPaginateAction(url: string) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function newsSearchAction(search: string) {
    const res = await fetch(`${baseURL}news-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function newsViewAction(id: string | number) {
    const res = await fetch(`${baseURL}news/${id}`, {
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

export async function _newsAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _newsListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _newsPaginateAction(url: string) {
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

export async function _newsSearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _newsViewAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _newsDeleteAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/news');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}

export async function _newsStoreAction(data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
            // Leave Content-Type out so the environment natively defines the FormData boundary
        }
    });
    revalidatePath('/admin/news');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}

export async function _newsUpdateAction(id: string | number, data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/news/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/news/${id}`);
    revalidatePath('/admin/news');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}