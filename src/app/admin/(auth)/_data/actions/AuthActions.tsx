"use server";

import { baseURL } from "@/_api/baseURL";
import { AuthServerCookieName } from "@/_cookie/CookieServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function loginAction(data: any) {
    const res = await fetch(`${baseURL}login`, {
      'method': 'POST',
      'body': await JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function registerAction(data: any) {
    const res = await fetch(`${baseURL}register`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath(`/login`);
    return await res.json();
}

/*********************************
*  AUTHENICATED
*********************************/
export async function _checkAuthAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get(AuthServerCookieName);
    if(!authToken?.value){ redirect('/admin/login'); }
    return 
}

export async function _checkUserIsAdminAction(num: number = 1) {
  const cookieStore = await cookies();
  const current = cookieStore.get('BAKO_CURRENT_USER_COOKIE');
  if (!current?.value) {
    redirect('/');
    return;
  }
  try {
    const user = JSON.parse(current.value);
    if (Number(user.roleLevel) <= num) {
      redirect('/');
      return;
    }
  } catch (e) {
    redirect('/');
  }
}

export async function _logoutAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get(AuthServerCookieName);
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/logout/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/login');
    return await res.json();
}



