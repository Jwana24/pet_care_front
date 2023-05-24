import { IAuthElement } from "@/app/components/Private/AuthProvider";
import axios, { AxiosResponse } from "axios";

export const isDefined = (value: any): boolean => ![ undefined, null, NaN ].includes(value);

export const isTokenValid = (expirationDateToken: IAuthElement | null) => {
  const currentDateToISO = new Date().toISOString();

  if (!isDefined(expirationDateToken)) return false;

  return (expirationDateToken?.expireAt && expirationDateToken.expireAt > currentDateToISO) && isDefined(expirationDateToken.accessToken)
}

export const requestGet = async (route: string, token?: string | null |undefined): Promise<AxiosResponse> => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, {
    headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
  });
}

export const requestPost = <T>(route: string, data?: any, token?: string | null |undefined): Promise<AxiosResponse> => {
  return axios.post<T>(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, data, {
    headers: { ...(token && { 'Authorization': `Bearer ${token}` }), 'Content-Type': 'application/json' }
  });
}

export const requestPatch = <T>(route: string, data?: any, token?: string | null |undefined): Promise<AxiosResponse> => {
  return axios.patch<T>(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, data, {
    headers: { ...(token && { 'Authorization': `Bearer ${token}` }), 'Content-Type': 'application/json' }
  });
}