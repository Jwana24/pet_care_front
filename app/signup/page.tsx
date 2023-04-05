import CredentialsForm from "@/app/components/ReusableComponents/CredentialsForm/CredentialsForm";

const SignUp = () => {
  return (
    <div>
      <CredentialsForm
        titlePage="Créez votre compte"
        subtitlePage="connectez-vous ici"
        textBtn="Inscription"
        isSignUpForm
        urlToRedirect="/login"
      />
    </div>
  )
}

export default SignUp;