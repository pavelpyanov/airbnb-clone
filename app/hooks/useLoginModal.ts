import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => {
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

export default useLoginModal;
