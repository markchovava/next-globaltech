"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";
import { AuthServerCookieName } from "@/_cookie/CookieServer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";



/*********************************
 * PUBLIC ACTIONS
 *********************************/

export async function galleryPaginateAction(url: string) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function galleryListAction() {
    const res = await fetch(`${baseURL}gallery`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function galleryAllAction() {
    const res = await fetch(`${baseURL}gallery-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function galleryViewAction(id: number | string) {
    const res = await fetch(`${baseURL}gallery/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function gallerySearchAction(search: string) {
    const res = await fetch(`${baseURL}gallery-search?search=${search}`, {
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

export async function _galleryListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _galleryPaginateAction(url: string) {
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

export async function _galleryAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _gallerySearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _galleryViewAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    return await res.json();
}

export async function _galleryStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AuthServerCookieName);
    if (!authToken?.value) {
        redirect('/admin/login');
    }
    const res = await fetch(`${baseURL}api/gallery`, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': `Bearer ${authToken.value}`,
        }
    });
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
    return await res.json();
}

export async function _galleryUpdateAction(id: string | number, data: any) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/gallery/${id}`);
    return await res.json();
}

export async function _galleryStatusUpdateAction(id: string | number, data: any) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery-status/${id}`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader,
        }
    });
    revalidatePath(`/admin/gallery/${id}`);
    return await res.json();
}

export async function _galleryDeleteAction(id: number | string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader,
        }
    });
    revalidatePath('/admin/gallery');
    return await res.json();
}