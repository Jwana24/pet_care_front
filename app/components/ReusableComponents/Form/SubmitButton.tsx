import React, { ButtonHTMLAttributes, FC, ReactElement } from "react";

interface IInputField extends ButtonHTMLAttributes<HTMLButtonElement> {
  isValidForm: boolean
  iconBtn?: ReactElement
  textBtn: string
}

const InputField: FC<IInputField> = ({
  isValidForm,
  iconBtn,
  textBtn,
  ...rest
}) => {
  return (
    <div className="mt-5">
      <button
        type="submit"
        disabled={!isValidForm}
        className="group relative flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold
          text-white hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600 disabled:bg-zinc-400"
        {...rest}
      >
        {iconBtn}
        {textBtn}
      </button>
    </div>
  )
}

InputField.displayName = 'InputField';

export default InputField;