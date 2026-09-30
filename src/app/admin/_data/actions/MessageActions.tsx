"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



/*********************************
 * PUBLIC ACTIONS
 *********************************/
export async function messageStoreAction(data: Record<string, any>) {
  const res = await fetch(`${baseURL}message`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  revalidatePath('/admin/message');
  return await res.json();
}

export async function messageListAction() {
  const res = await fetch(`${baseURL}message`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function messageAllAction() {
  const res = await fetch(`${baseURL}message-all`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function messageViewAction(id: number | string) {
  const res = await fetch(`${baseURL}message/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return await res.json();
}

export async function messageSearchAction(search: string) {
  const res = await fetch(`${baseURL}message-search?search=${search}`, {
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

export async function _messageListAction() {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _messagePaginateAction(url: string) {
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

export async function _messageAllAction() {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message-all`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _messageSearchAction(search: string) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message-search?search=${search}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _messageViewAction(id: number | string) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  return await res.json();
}

export async function _messageStoreAction(data: Record<string, any>) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath('/admin/message');
  return await res.json();
}

export async function _messageUpdateAction(id: string | number, data: Record<string, any>) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath(`/admin/message/${id}`);
  revalidatePath('/admin/message'); // Additionally clearing container list to display update changes immediately
  return await res.json();
}

export async function _messageDeleteAction(id: number | string) {
  const authHeader = await getAuthHeaders();
  const res = await fetch(`${baseURL}api/message/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });
  revalidatePath('/admin/message');
  return await res.json();
}