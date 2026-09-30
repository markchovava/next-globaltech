"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";





/*********************************
 * PUBLIC ACTIONS
 *********************************/
export async function carByNumAction(num: string | number) {
    const params = `num=${num}`;
    const res = await fetch(`${baseURL}car-by-num?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}


export async function carByPriceAction(min: string | number, max: string | number) {
    // 1. Build URLSearchParams dynamically to drop empty/undefined keys
    const queryParams = new URLSearchParams();
    if (min !== undefined && min !== '') queryParams.append('min', min.toString());
    if (max !== undefined && max !== '') queryParams.append('max', max.toString());
    const queryString = queryParams.toString();
    const url = `${baseURL}car-by-price${queryString ? `?${queryString}` : ''}`;
    console.log(url);
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // 2. Prevent Next.js from caching dynamic search filter results
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch cars by price:", error);
        return null; // Return null so your store catch block handles it cleanly
    }
}

export async function carByYearAction(min: string | number, max: string | number) {
    // 1. Build URLSearchParams dynamically to drop empty/undefined keys
    const queryParams = new URLSearchParams();
    if (min !== undefined && min !== '') queryParams.append('min', min.toString());
    if (max !== undefined && max !== '') queryParams.append('max', max.toString());
    const queryString = queryParams.toString();
    const url = `${baseURL}car-by-year${queryString ? `?${queryString}` : ''}`;
    // console.log(url);
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // 2. Prevent Next.js from caching dynamic search filter results
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch cars by price:", error);
        return null; // Return null so your store catch block handles it cleanly
    }
}

export async function carByBrandAction(brandId: string | number) {
    const params = `brandId=${brandId}`;
    const res = await fetch(`${baseURL}car-by-brand?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carFrontAction() {
    const res = await fetch(`${baseURL}car-front`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carAllAction() {
    const res = await fetch(`${baseURL}car-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carListAction() {
    const res = await fetch(`${baseURL}car`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carPaginateAction(url: string) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carSearchAction(search: string) {
    const params = `search=${search}`;
    const res = await fetch(`${baseURL}car-search?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

export async function carViewAction(id: string | number) {
    const res = await fetch(`${baseURL}car/${id}`, {
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

export async function _carByPriceAction(min: string | number, max: string | number) {
    const authHeader = await getAuthHeaders();
    const params = `min=${min}&max=${max}`;
    const res = await fetch(`${baseURL}car-by-price?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carByBrandAction(brand: string | number) {
    const authHeader = await getAuthHeaders();
    const params = `brandId=${brand}`;
    const res = await fetch(`${baseURL}car-by-brand?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carAllAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car-all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carListAction() {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carPaginateAction(url: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carSearchAction(search: string) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car-search?search=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carViewAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    return await res.json();
}

export async function _carDeleteAction(id: string | number) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeader
        }
    });
    revalidatePath('/admin/car');
    return await res.json();
}

export async function _carStoreAction(data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car`, {
        method: 'POST',
        body: data,
        headers: {
            ...authHeader
            // Note: Don't manually set Content-Type for FormData; 
            // browser/runtime sets boundary automatically.
        }
    });
    revalidatePath('/admin/car');
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}

export async function _carUpdateAction(id: string | number, data: FormData) {
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${baseURL}api/car/${id}`, {
        method: 'POST', // Note: If your backend uses PUT/PATCH, change this to match
        body: data,
        headers: {
            ...authHeader
        }
    });
    revalidatePath(`/admin/car/${id}`);
    revalidatePath('/admin/car'); // Also clear the parent list so changes reflect
    revalidatePath('/buy-a-car');
    revalidatePath('/');
    return await res.json();
}