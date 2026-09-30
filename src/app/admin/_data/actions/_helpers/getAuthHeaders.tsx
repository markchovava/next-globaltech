"use server";

import { AuthServerCookieName } from "@/_cookie/CookieServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



// Helper function to handle authentication and prevent code repetition
export async function getAuthHeaders(): Promise<{ Authorization: string }> {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AuthServerCookieName);

    if (!authToken?.value) {
        redirect('/admin/login');
    }

    return {
        'Authorization': `Bearer ${authToken.value}`
    };
}