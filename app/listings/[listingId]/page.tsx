import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmtyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface ListingIdPageProps {
  params: {
    listingId: string;
  };
}

const ListingIdPage = async ({ params }: ListingIdPageProps) => {
  const listing = await getListingById(params.listingId);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      currentUser={currentUser}
      listing={listing}
      reservations={reservations}
    />
  );
};

export default ListingIdPage;
