"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[35vh] flex justify-center items-center">Loading...</div>
  ),
});

interface ListingInfoProps {
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  roomCount: number;
  bathCount: number;
  guestCount: number;
  locationValue: string;
  description: string;
  user: SafeUser;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  bathCount,
  guestCount,
  locationValue,
  roomCount,
  user,
  category,
  description,
}) => {
  const { getValue } = useCountries();

  const coordinates = getValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms </div>
          <div>{bathCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          description={category.description}
          label={category.label}
        />
      )}
      <hr />
      <div className="text-lg font-light">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
