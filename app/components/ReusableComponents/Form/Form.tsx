'use client';

import React, { useState } from 'react';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PropsForm {
  titlePage: string
  subtitlePage: string
  textBtn: string
  isSignUpForm?: boolean
}

const Form = ({ titlePage, subtitlePage, textBtn, isSignUpForm }: PropsForm) => {
  const [passwordValue, setPasswordValue] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false
  });

  const handleClickShowPassword = (field: "showPassword" | "showConfirmPassword") => () => {
    return setPasswordValue({...passwordValue, [field]: !passwordValue[field]})
  }

  const handlePasswordChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue({ ...passwordValue, [prop]: event.target.value });
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {titlePage}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <a href="/login" className="font-medium text-sky-700 hover:text-sky-900">
              {subtitlePage}
            </a>
          </p>
        </div>

        <form className="mt-8 block max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" action="#" method="POST">
          <div className="rounded-md shadow-sm">
            <div className="mb-5">
              <label htmlFor="email-address">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full mt-3.5 rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="relative">
              <label htmlFor="password">
                Mot de passe
              </label>
              <div className="eye_div">
                <input
                  id="password"
                  name="password"
                  type={passwordValue.showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full mt-3.5 rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={handlePasswordChange("password")}
                  value={passwordValue.password}
                />
                <div className="icon_button absolute right-4 top-11" onClick={handleClickShowPassword("showPassword")}>
                  {passwordValue.showPassword ? (
                    <EyeIcon className="h-6 text-gray-400" />
                  ) : (
                    <EyeSlashIcon className="h-6 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {isSignUpForm &&
              <div className="relative mt-5">
                <label htmlFor="password">
                  Confirmer le mot de passe
                </label>
                <div className="eye_div">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={passwordValue.showConfirmPassword ? "text" : "password"}
                    autoComplete="confirm-password"
                    required
                    className="relative block w-full mt-3.5 rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    onChange={handlePasswordChange("confirmPassword")}
                    value={passwordValue.confirmPassword}
                  />
                  <div className="icon_button absolute right-4 top-11" onClick={handleClickShowPassword("showConfirmPassword")}>
                    {passwordValue.showConfirmPassword ? (
                      <EyeIcon className="h-6 text-gray-400" />
                    ) : (
                      <EyeSlashIcon className="h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="flex items-center justify-end mt-2 mb-5">
            <div className="text-sm">
              <a href="#" className="font-medium text-sky-700 hover:text-sky-900">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-sky-600 group-hover:text-sky-800" aria-hidden="true" />
                  </span>
              {textBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form