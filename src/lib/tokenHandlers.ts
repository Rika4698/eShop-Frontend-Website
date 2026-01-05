"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"





export const setCookie = async (key:string, value:string, options:Partial<ResponseCookie>) =>  {
    const cookieStore = await cookies();
    return cookieStore.set(key, value, options);
};


export const getCookie = async(key:string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
};


export const deleteCookie = async (key:string) => {
    const cookieStore = await cookies();
    return cookieStore.delete(key);
};


export const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
};