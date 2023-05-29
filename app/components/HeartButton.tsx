"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorites from "../hooks/useFavorites";

interface HeartButton {
  listingId: string;
  currentUser: SafeUser | null;
}

const HeartButton: React.FC<HeartButton> = ({ currentUser, listingId }) => {
  const { hasFavorites, voteFavorite } = useFavorites({
    currentUser,
    listingId,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={voteFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorites ? "fill-rose-500" : "fill-neutral-500"}
      />
    </div>
  );
};

export default HeartButton;
