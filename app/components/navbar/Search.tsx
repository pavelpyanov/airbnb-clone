"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search: React.FC = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getValue } = useCountries();

  const locationValue = params.get("locationValue");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const guestCount = params.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getValue(locationValue)?.label;
    }

    return "Anywhere";
  }, [locationValue, getValue]);

  const duration = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {duration}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">
            {guestCount ? `${guestCount} Guests` : "Add guests"}
          </div>
          <div className="p-2 bg-pink-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
