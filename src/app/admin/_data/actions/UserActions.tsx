"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



/*********************************
 * AUTHENTICATED USER ACTIONS
 *********************************/

export async function _userListAction() {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _userPaginateAction(url: string) {
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

export async function _userSearchAction(search: string) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user-search?search=${search}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _userViewAction(id: string | number) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _userDeleteAction(id: string | number) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath('/admin/user');
  return await res.json();
}

export async function _userStoreAction(data: Record<string, any>) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user`, {
    method: 'POST',
    body: JSON.stringify(data), // Removed invalid 'await' here
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath('/admin/user');
  return await res.json();
}

export async function _userUpdateAction(id: string | number, data: Record<string, any>) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/user/${id}`, {
    method: 'POST',
    body: JSON.stringify(data), // Removed invalid 'await' here
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath(`/admin/user/${id}`);
  revalidatePath('/admin/user'); // Revalidate cache for the listing view as well
  return await res.json();
}