"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Heading from "../navbar/Heading";
import Input from "../inputs/Input";
import Button from "../Button";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegister";

const LoginModal: React.FC = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onCloseHandler = () => {
    reset();
    loginModal.onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    setIsLoading(false);

    if (response?.ok) {
      toast.success("Logged in");
      router.refresh();
      loginModal.onClose();
    }

    if (response?.error) {
      toast.error(response.error);
    }
  };

  const onOpenRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Log in to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        required
        type="password"
        autoComplete="off"
      />
    </form>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
        text-neutral-500
        text-center
        nt-4
        font-light
        "
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Firs time using airbnb?</div>
          <div
            className="
            text-neutral-800
            cursor-pointer
            hover:underline 
          "
            onClick={onOpenRegisterModal}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      actionLabel="Continue"
      onClose={onCloseHandler}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
