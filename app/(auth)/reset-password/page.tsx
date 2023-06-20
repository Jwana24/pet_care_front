'use client';

import { useRouter } from 'next/navigation';
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";
import { IApiError } from "../../types";
import { useContext } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestPost } from "../../utils";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const { setAuthentication } = useContext(AuthContext) as IContext;

  const handleResetPassword = async (data: IFormInputs): Promise<true | IApiError> => {
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
        resetPassword
        titlePage="Réinitialiser le mot de passe"
        subtitlePage="connectez-vous ici"
        textBtn="Réinitialiser le mot de passe"
        onSubmit={handleResetPassword}
      />
    </div>
  )
}

export default ResetPassword;