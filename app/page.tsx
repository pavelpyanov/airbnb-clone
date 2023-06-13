import Container from "./components/Container";
import EmptyState from "./components/EmtyState";
import getListings, { ListingParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export const revalidate = 60;

interface HomeProps {
  searchParams: ListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings({ ...searchParams });
  const currentUser = await getCurrentUser();
  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((item) => (
          <ListingCard key={item.id} data={item} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
