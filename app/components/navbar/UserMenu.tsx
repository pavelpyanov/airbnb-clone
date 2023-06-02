"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import useRegisterModal from "@/app/hooks/useRegister";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const onClickHome = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onClickHome}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex fle-row gap-3 items-center rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
          ref={ref}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image || null} />
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem label="Home" onClick={() => router.push("/")} />
                    <MenuItem
                      label="My trips"
                      onClick={() => router.push("/trips")}
                    />
                    <MenuItem
                      label="My favorites"
                      onClick={() => router.push("/favorites")}
                    />
                    <MenuItem
                      label="My reservations"
                      onClick={() => router.push("/reservations")}
                    />
                    <MenuItem
                      label="My properties"
                      onClick={() => router.push("/properties")}
                    />
                    <MenuItem
                      label="Airbnb my home"
                      onClick={rentModal.onOpen}
                    />
                    <hr />
                    <MenuItem label="Logout " onClick={signOut} />
                  </>
                ) : (
                  <>
                    <MenuItem label="Login" onClick={loginModal.onOpen} />
                    <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
