import React from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";

function InputField({
  label,
  id,

  placeholder,
  classes = "",
  type,
  register,
}: {
  label: string;
  id: string;

  placeholder: string;
  classes?: string;
  type: string;
  register: UseFormRegisterReturn;
}) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col justify-start items-start gap-[0.5px]">
      <label htmlFor={id} className="text-text text-[14px] font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        placeholder={placeholder}
        className={`
        ${errors[id] && "border-[1px] border-red-500"}
        outline-none border-[1px] border-disapled rounded-md p-2 max-w-[300px] md:w-[375px] text-black ${classes}`}
      />
      {errors[id] && (
        <p className="capitalize text-sm text-red-500">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
}

export default InputField;
