import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface ISelectField extends InputHTMLAttributes<HTMLSelectElement> {
  inline?: boolean
  label: string
  name: string
  autoComplete?: string
  register: UseFormRegister<any>
  options: Array<{ value: string, optionName: string }>
  errors: string | undefined
}

const SelectField = ({
  inline,
  label,
  name,
  autoComplete,
  register,
  options,
  errors,
  ...rest
}: ISelectField) => {
  return (
    <div className={`mb-5 ${inline ? "flex items-center" : ""}`}>
      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <select
          autoComplete={autoComplete}
          {...register(name)}
          className={`block w-full ${!inline && "mt-3.5"} bg-white rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset
            ring-gray-300 sm:text-sm sm:leading-6`}
          {...rest}
        >
          {options.map((option: { value: string, optionName: string }, index: number) => (
            <option key={index} value={option.value}>{option.optionName}</option>
          ))}
        </select>
        { errors && <small className="text-red-600 font-medium">{errors}</small> }
      </div>
    </div>
  )
}

export default SelectField;