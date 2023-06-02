import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => {
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

export default useRegisterModal;
