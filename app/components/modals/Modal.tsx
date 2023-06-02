"use client";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  secondaryLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const ref = useOutsideClick(() => {
    closeHandler();
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const closeHandler = () => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5  mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            showModal ? "translate-y-0" : "translate-y-full"
          } ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          {/* CONTENT */}
          <div
            ref={ref}
            className="
          transition
          h-full
          lg:h-auto
          md:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative
          flex
          flex-col
          w-full
          bg-white
          outline-none
          focus:outline-none
          "
          >
            {/* HEADER */}
            <div
              className="
            flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-b-[1px]
            "
            >
              <button
                onClick={closeHandler}
                className="p-1 border-0 hover:opacity-70 transition absolute left-5 "
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
