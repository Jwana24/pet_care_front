'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";
import { IApiError } from "@/app/components/types";
import { useContext } from "react";
import { AuthContext } from "@/app/components/Private/AuthProvider";

const Login = () => {
  const router = useRouter();
  const { setAuthentication } = useContext(AuthContext);

  const handleLogin = async (data: IFormInputs): Promise<true|IApiError> => {
    return await axios(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data)
    })
      .then(async (response) => {
        const authToken = await response.data.accessToken;
        localStorage.setItem('accessToken', authToken);
        setAuthentication(authToken);
        await router.push('/');
        return true;
      })
      .catch((e) => e.response.data)
  }

  return (
    <div>
      <CredentialsForm
        titlePage="Connectez-vous à votre compte"
        subtitlePage="créez votre compte ici"
        textBtn="Connexion"
        urlToRedirect="/signup"
        onSubmit={handleLogin}
      />
    </div>
  )
}

export default Login;