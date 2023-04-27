'use client';

// modules
import React from 'react';
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// components
import { LockClosedIcon } from "@heroicons/react/20/solid";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import PasswordField from "@/app/components/ReusableComponents/Fields/PasswordField";
import SubmitButton from "@/app/components/ReusableComponents/Fields/SubmitButton";

interface ICredentialsForm {
  titlePage: string
  subtitlePage: string
  textBtn: string
  isSignUpForm?: boolean
  urlToRedirect: string
}

type IFormInputs = {
  email: string
  password: string
  confirmPassword?: string
};

const validationSchema = yup.object({
  email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
  confirmPassword: yup.string()
    .when('$isSignUpForm', ([isSignUpForm], fieldSchema) => {
      return isSignUpForm ? fieldSchema.required("La confirmation du mot de passe est requis") : fieldSchema.notRequired()
    })
    .oneOf(
    [yup.ref("password"), undefined],
    "La confirmation du mot de passe ne correspond pas"
    )
});

const CredentialsForm = ({ titlePage, subtitlePage, textBtn, isSignUpForm = false, urlToRedirect }: ICredentialsForm) => {
  const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: { isSignUpForm: isSignUpForm }
  })

  const handleRegistration = (data: any) => {
    console.log(data)
    reset();
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {titlePage}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link href={urlToRedirect} className="font-medium text-sky-700 hover:text-sky-900">
              {subtitlePage}
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="mt-8 block max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800
            dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="rounded-md">
            <InputField
              label="Adresse email"
              name="email"
              type="email"
              autoComplete="email"
              register={register}
              errors={errors.email?.message}
            />

            <PasswordField
              label="Mot de passe"
              name="password"
              autoComplete={!isSignUpForm ? "current-password" : "new-password"}
              register={register}
              errors={errors.password?.message}
            />

            {isSignUpForm &&
              <div className="mt-5">
                <PasswordField
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  register={register}
                  errors={errors.confirmPassword?.message}
                />
              </div>
            }
          </div>

          {!isSignUpForm &&
            <div className="flex items-center justify-end mt-2">
              <div className="text-sm">
                <a href="#" className="font-medium text-sky-700 hover:text-sky-900">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          }

          <SubmitButton
            isValidForm={isValid}
            iconBtn={(
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className={[isValid ? "text-sky-400 group-hover:text-sky-600" : "text-zinc-600", "h-5 w-5"].join(' ')}
                  aria-hidden="true"
                />
              </span>
            )}
            textBtn={textBtn}
          />
        </form>
      </div>
    </div>
  )
}

export default CredentialsForm;