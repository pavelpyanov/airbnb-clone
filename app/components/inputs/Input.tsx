"use client";

import React from "react";
import { FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  formatPrice?: boolean;
  errors: FieldErrors;
}

const Input: React.FC<CustomInputProps> = ({
  errors,
  formatPrice,
  ...props
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        {...props}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[props.id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[props.id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
        absolute
        duration-150
        transition
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${formatPrice ? "left-9" : "left-4"}
        ${errors[props.id] ? "text-rose-500" : "text-zinc-400 "}
        `}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
