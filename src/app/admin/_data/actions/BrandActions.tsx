"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";


/*********************************
 * PUBLIC ACTIONS
 *********************************/

export async function brandFrontAction() {
  const res = await fetch(`${baseURL}brand-front`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function brandAllAction() {
  const res = await fetch(`${baseURL}brand-all`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function brandListAction() {
  const res = await fetch(`${baseURL}brand`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function brandPaginateAction(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function brandSearchAction(search: string) {
  const res = await fetch(`${baseURL}brand-search?search=${search}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function brandViewAction(id: string | number) {
  const res = await fetch(`${baseURL}brand/${id}`, {
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

export async function _brandAllAction() {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand-all`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _brandListAction() {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _brandPaginateAction(url: string) {
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

export async function _brandSearchAction(search: string) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand-search?search=${search}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _brandViewAction(id: string | number) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _brandDeleteAction(id: string | number) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath('/admin/brand');
  revalidatePath('/buy-a-car');
  revalidatePath('/');
  return await res.json();
}

export async function _brandStoreAction(data: FormData) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand`, {
    method: 'POST',
    body: data,
    headers: {
      ...authHeader,
      // Leave Content-Type out so the environment natively defines the FormData boundary
    }
  });
  revalidatePath('/admin/brand');
  revalidatePath('/buy-a-car');
  revalidatePath('/');
  return await res.json();
}

export async function _brandUpdateAction(id: string | number, data: FormData) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/brand/${id}`, {
    method: 'POST',
    body: data,
    headers: {
      ...authHeader,
    }
  });
  revalidatePath(`/admin/brand/${id}`);
  revalidatePath('/admin/brand');
  revalidatePath('/buy-a-car');
  revalidatePath('/');
  return await res.json();
}