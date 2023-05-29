"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Airbnb"
      className="hidden md:block cursor-pointer w-auto h-auto"
      height={100}
      width={100}
      src="/images/logo.png"
      priority
    />
  );
};

export default Logo;
