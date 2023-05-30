import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  preInput?: boolean
  name: string
  type: React.HTMLInputTypeAttribute
  autoComplete?: string
  register: UseFormRegister<any>
  errors: string | undefined
}

const InputField = ({
  inline,
  label,
  preInput,
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
        <div className={`${preInput ? "flex" : ""}`}>
          {preInput && (
            <span className={`inline-flex items-center ${!inline && "mt-3.5"} rounded-l-md border-0 py-1.5 px-3.5 sm:text-sm text-gray-900 bg-gray-300`}>
              +33
            </span>
          )}
          <input
            type={type}
            autoComplete={autoComplete}
            {...register(name)}
            className={`block w-full ${!inline && "mt-3.5"} border border-gray-300 py-1.5 px-3.5 text-gray-900 focus:ring-1 focus:ring-inset
              sm:text-sm sm:leading-6 ${preInput ? "rounded-r-md pl-2 border border-l-0 border-gray-300" : "rounded-md"}`}
            {...rest}
          />
        </div>
      { errors && <small className="text-red-600 font-medium">{errors}</small> }
    </div>
  )
}

export default InputField;