import CredentialsForm from "@/app/components/ReusableComponents/CredentialsForm/CredentialsForm";

const Login = () => {
    return (
        <div>
            <CredentialsForm
              titlePage="Connectez-vous à votre compte"
              subtitlePage="créez votre compte ici"
              textBtn="Connexion"
              urlToRedirect="/signup"
            />
        </div>
    )
}

export default Login;