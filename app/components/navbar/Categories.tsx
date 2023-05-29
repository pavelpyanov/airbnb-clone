"use client";

import React from "react";
import Container from "../Container";

import { TbBeach } from "react-icons/tb";
import {
  GiBoatFishing,
  GiWindmill,
  GiIsland,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbPool, TbMountain } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamondSharp } from "react-icons/io5";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This properties has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This properties is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This properties is countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This properties is pools",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This properties is island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This properties is lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This properties is skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This properties is in a castles",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This properties is camping",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This properties is Arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This properties is cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This properties is desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This properties is barns",
  },
  {
    label: "Lux",
    icon: IoDiamondSharp,
    description: "This properties is lux",
  },
];

const Categories: React.FC = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get("category");
  const path = usePathname();

  if (path !== "/") {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
            selected={currentCategory === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
