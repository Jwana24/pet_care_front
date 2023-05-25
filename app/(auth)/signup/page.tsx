'use client';

import { IApiError } from "@/app/components/types";
import CredentialsForm, { IFormInputs } from "@/app/components/ReusableComponents/Form/CredentialsForm";

const SignUp = () => {
  const handleRegister = async (data: IFormInputs): Promise<true | IApiError> => {
    console.log(data)
    return true;
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