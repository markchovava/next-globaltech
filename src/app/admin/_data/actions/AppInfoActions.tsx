"use server";

import { revalidatePath } from "next/cache";
import { baseURL } from "@/_api/baseURL";
import { getAuthHeaders } from "./_helpers/getAuthHeaders";



export async function appInfoViewAction() {
  const res = await fetch(`${baseURL}app-info`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  return await res.json();
}


/*********************************
 * AUTHENTICATED APP INFO ACTIONS
 *********************************/

export async function _appInfoViewAction() {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/app-info`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader,
    }
  });

  return await res.json();
}

export async function _appInfoStoreAction(data: FormData) {
  const authHeader = await getAuthHeaders();

  const res = await fetch(`${baseURL}api/app-info`, {
    method: 'POST',
    body: data,
    headers: {
      ...authHeader,
      // Content-Type is naturally handled by the runtime for FormData payloads
    }
  });

  revalidatePath('/admin/app-info');
  return await res.json();
}