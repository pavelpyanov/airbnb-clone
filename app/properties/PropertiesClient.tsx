"use client";

import React, { useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/navbar/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<TripsClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.request({
        method: "DELETE",
        url: `/api/listing/${id}`,
      });

      toast.success("Property deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((item) => (
          <ListingCard
            key={item.id}
            data={item}
            onAction={onCancel}
            actionLabel="Delete property"
            actionId={item.id}
            currentUser={currentUser}
            disabled={deletingId === item.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
