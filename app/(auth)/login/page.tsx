'use client';

import { useRouter } from 'next/navigation';
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";
import { IApiError } from "@/app/components/types";
import { useContext } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestPost } from "@/app/components/utils";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { setAuthentication } = useContext(AuthContext) as IContext;

  const handleLogin = async (data: IFormInputs): Promise<true | IApiError> => {
    return await requestPost<IFormInputs>('auth/login', data)
      .then(async (response) => {
        localStorage.setItem('accessToken', JSON.stringify(response.data));
        setAuthentication(response.data);
        await router.push('/');
        toast.success("Bonjour !", { icon: "👋" });
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