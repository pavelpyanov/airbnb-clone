import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => {
      document.body.style.overflow = "hidden";
      set({ isOpen: true });
    },
    onClose: () => {
      document.body.style.overflow = "auto";
      set({ isOpen: false });
    },
  };
});

export default useSearchModal;
