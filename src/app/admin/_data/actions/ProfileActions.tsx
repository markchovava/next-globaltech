"use server";

import { baseURL } from "@/_api/baseURL";
import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";




/*********************************
 * AUTHENTICATED PROFILE ACTIONS
 *********************************/

export async function _profileViewAction() {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/profile`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });

  return await res.json();
}

export async function _profileStoreAction(data: Record<string, any>) {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/profile`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });

  revalidatePath('/admin/profile');
  return await res.json();
}

export async function _emailUpdateAction(data: Record<string, any>) {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/email`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });

  revalidatePath('/admin/profile');
  return await res.json();
}

export async function _passwordUpdateAction(data: Record<string, any>) {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/password`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });

  revalidatePath('/admin/profile');
  return await res.json();
}