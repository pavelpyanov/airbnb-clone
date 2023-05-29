import { MouseEventHandler } from "react";
import axios from "axios";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseFavoritesParams {
  listingId: string;
  currentUser: SafeUser | null;
}

const useFavorites = ({ currentUser, listingId }: UseFavoritesParams) => {
  const { onOpen } = useLoginModal();
  const router = useRouter();

  const favorites = currentUser?.favoriteIds || [];

  const hasFavorites = favorites.includes(listingId);

  const voteFavorite: MouseEventHandler = async (e) => {
    e.stopPropagation();

    if (!currentUser) {
      return onOpen();
    }
    try {
      await axios.request({
        method: "PATCH",
        url: `/api/favorites/${listingId}`,
      });

      toast.success("Success", {
        position: "top-right",
      });
      router.refresh();
    } catch (error) {
      toast.error("Fail to vote for listing", {
        position: "top-right",
      });
    }
  };

  return { hasFavorites, voteFavorite };
};

export default useFavorites;
