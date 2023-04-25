import React, { FC, InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface IPasswordField extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  autoComplete?: string
  register?: any
  errors: string | undefined
}

const PasswordField: FC<IPasswordField> = ({
  label,
  name,
  autoComplete,
  register,
  errors,
  ...rest
}) => {
  const [passwordValue, setPasswordValue] = useState(false);

  const handleClickShowPassword = () => {
    return setPasswordValue(!passwordValue)
  }

  return (
    <div className="relative">
      <label htmlFor={name}>{label}</label>
      <div className="eye_div">
        <input
          type={passwordValue ? "text" : "password"}
          autoComplete={autoComplete}
          {...register(name)}
          className="relative block w-full mt-3.5 rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset
            ring-gray-300 sm:text-sm sm:leading-6"
          {...rest}
        />
        <small className="text-red-600 font-medium">{errors}</small>
        <div className="icon_button absolute right-4 top-11" onClick={handleClickShowPassword}>
          {passwordValue ? (
            <EyeIcon className="h-6 text-gray-400" />
          ) : (
            <EyeSlashIcon className="h-6 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  )
}

PasswordField.displayName = 'PasswordField';

export default PasswordField;