import React, { FC, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  labelSize?: number
  name: string
  type: React.HTMLInputTypeAttribute
  autoComplete?: string
  register: UseFormRegister<any>
  errors: string | undefined
}

const InputField: FC<IInputField> = ({
  inline,
  label,
  labelSize,
  name,
  type,
  autoComplete,
  register,
  errors,
  ...rest
}) => {
  const customLabelSize = inline && `w-${labelSize}`

  return (
    <div className={`mb-5 ${inline ? "flex items-center" : ""}`}>
      <label htmlFor={name} className={`${customLabelSize}`}>{label}</label>
      <input
        type={type}
        autoComplete={autoComplete}
        {...register(name)}
        className={`relative block w-full ${!inline && "mt-3.5"} rounded-md border-0 py-1.5 px-3.5 text-gray-900
          ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6`}
        {...rest}
      />
      { errors && <small className="text-red-600 font-medium">{errors}</small>}
    </div>
  )
}

InputField.displayName = 'InputField';

export default InputField;