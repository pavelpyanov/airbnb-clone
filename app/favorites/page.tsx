import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmtyState";
import getFavorites from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favoriteListings = await getFavorites();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't favorite trips"
      />
    );
  }

  return (
    <FavoritesClient listings={favoriteListings} currentUser={currentUser} />
  );
};

export default FavoritesPage;
