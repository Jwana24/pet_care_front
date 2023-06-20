'use client';

import { useRouter } from 'next/navigation';
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";
import { IApiError } from "../../types";
import { useContext } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestPost } from "../../utils";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const router = useRouter();
  const { setAuthentication } = useContext(AuthContext) as IContext;

  const handleForgotPassword = async (data: IFormInputs): Promise<true | IApiError> => {
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
        forgotPassword
        titlePage="Mot de passe oublié"
        subtitlePage="connectez-vous ici"
        textBtn="Envoyer le code de réinitialisation"
        onSubmit={handleForgotPassword}
      />
    </div>
  )
}

export default ForgotPassword;