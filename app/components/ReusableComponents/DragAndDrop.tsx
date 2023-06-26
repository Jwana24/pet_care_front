import React, { DragEvent, useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Image from "next/image";

interface DragAndDrop {
  name: string
  fileType?: string
  register: UseFormRegister<any>
  watch:  UseFormWatch<any>
  setValue: UseFormSetValue<any>
  errors: string | undefined
}

const DragAndDrop = ({ name, fileType, register, watch, setValue, errors, ...rest }: DragAndDrop) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ dragActive, setDragActive ] = useState(false);
  const [ img, setImg ] = useState<string>("");
  const { ref, onChange, ...restRegister } = register(name);
  const currentValue: FileList|undefined|string = watch(name);

  const fileToBase64 = (file: FileList): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file[0]);
      reader.onload = () => resolve(reader?.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const base64 = await fileToBase64(e.dataTransfer.files);
      setValue(name, base64);
    }
  };

  const onButtonClick = () => {
    inputRef?.current?.click();
  };

  useEffect(() => {
    if (currentValue && currentValue[0]) {
      if (typeof currentValue === "string") {
        setImg(currentValue);
      } else {
        fileToBase64(currentValue)
          .then(data => setImg(data));
      }
    }
  }, [currentValue]);

  return (
    <div className="h-64 w-full max-w-full text-center relative" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        accept={fileType}
        className="hidden"
        multiple={true}
        onChange={async (e) => await onChange(e)}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
        {...rest}
        {...restRegister}
      />
      <label
        className={`h-full flex items-center justify-center border-2 rounded-2xl border-dashed border-slate-200 bg-slate-50
          ${dragActive ? "bg-white" : ""}`}
        htmlFor="input-file-upload"
      >
        <div className="flex flex-col">
          <div>
            <p>Glisser / déposer un fichier ici, ou</p>
            <button className="cursor-pointer p-1 text-base border-none bg-transparent hover:underline" onClick={onButtonClick}>
              téléverser un fichier
            </button>
          </div>
          {img && <Image src={img} alt="Image" width={238} height={180} />}
        </div>
      </label>
      {dragActive && (
        <div
          className="absolute w-full h-full rounded-2xl top-0 bottom-0 right-0 left-0"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      { errors && <small className="text-red-600 font-medium">{errors}</small> }
    </div>
  )
}

export default DragAndDrop;