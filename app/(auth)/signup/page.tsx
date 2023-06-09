'use client';

import { useRouter } from 'next/navigation';
import { IApiError } from "../../types";
import { useContext } from "react";
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestPost } from "../../utils";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const { setAuthentication } = useContext(AuthContext) as IContext;

  const handleRegister = async (data: IFormInputs): Promise<true | IApiError> => {
    return await requestPost<IFormInputs>('auth/register', {
      ...data,
      confirmPassword: undefined
    })
      .then(async (response) => {
        localStorage.setItem('accessToken', JSON.stringify(response.data));
        setAuthentication(response.data);
        await router.push('/');
        toast.success("Bienvenue !", { icon: "🙌" });
        return true;
      })
      .catch((e) => {
        // setError('password', { type: requestStatus.statusCode.toString(), message: requestStatus.message });
        return e.response.data
      })
  }

  return (
    <div>
      <CredentialsForm
        titlePage="Créez votre compte"
        subtitlePage="connectez-vous ici"
        textBtn="Inscription"
        isSignUpForm
        urlToRedirect="/login"
        onSubmit={handleRegister}
      />
    </div>
  )
}

export default SignUp;