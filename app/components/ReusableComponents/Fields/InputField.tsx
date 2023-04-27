import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  name: string
  type: React.HTMLInputTypeAttribute
  autoComplete?: string
  register: UseFormRegister<any>
  errors: string | undefined
}

const InputField = ({
  inline,
  label,
  name,
  type,
  autoComplete,
  register,
  errors,
  ...rest
}: IInputField) => {
  return (
    <div className={`mb-5 ${inline ? "flex items-center" : ""}`}>
      <label htmlFor={name} className={inline ? "w-28" : ""}>{label}</label>
      <input
        type={type}
        autoComplete={autoComplete}
        {...register(name)}
        className={`block w-full ${!inline && "mt-3.5"} rounded-md border-0 py-1.5 px-3.5 text-gray-900 ring-1 ring-inset
          ring-gray-300 sm:text-sm sm:leading-6`}
        {...rest}
      />
      { errors && <small className="text-red-600 font-medium">{errors}</small> }
    </div>
  )
}

export default InputField;