"use client";

import React, { useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/navbar/Heading";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.request({
        method: "DELETE",
        url: `/api/reservations/${id}`,
      });

      toast.success("Reservation canceled");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <Container>
      <Heading title="Reservations" subTitle="Booking your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((item) => (
          <ListingCard
            key={item.id}
            currentUser={currentUser}
            data={item.listing}
            disabled={item.id === deletingId}
            actionId={item.id}
            actionLabel="Cancel guest reservation"
            onAction={onCancel}
            reservation={item}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
